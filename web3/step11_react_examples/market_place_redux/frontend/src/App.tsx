import React, { useState, useEffect } from "react";
import Web3 from "web3";
import EthContract from 'web3-eth-contract'
import Navbar from "./Navbar";
import Marketplace from "./abis/Marketplace.json";
import Main from "./Main";
import loader from "./assets/loading.gif";
import {Product } from "./types"
import {AbiItem} from 'web3-utils';
import { useDispatch, useSelector} from 'react-redux';
import { setProduct, addProduct, updateProduct } from './store/MarketplaceSlice';
import { RootStateType } from "./store/store";

const App : React.FC<{}> = ({}) => {
  const [account, setAccount] = useState<string>("");
  const [error, setError] = useState<string | boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);  
  const [loading, setLoading] = useState<boolean>();
  const [marketplace, setMarketplace] = useState<any>();

  
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const dispatch = useDispatch();
  const productsFromRedux = useSelector((state: RootStateType) => { return state.products})
  
  const createProduct = async(name: string, price: number) => {
    setLoading(true);
    try {
     await marketplace.methods
        .createProduct(name, price)
        .send({ from: account })
        .on("receipt", function (receipt: any) {
          console.log("success");  
          const newproduct = {id: (products.length+1).toString(), name: name , price: price, owner: account, purchased:false}
          dispatch(addProduct(newproduct))      
        })
        .on("error", function (error: any) {
          window.alert(error.message);
        });        
        
        setLoading(false);
    } catch (error:any) {
      window.alert(error.message);
      setLoading(false)
    } 

  };

    //////////////////////////
  const purchaseProduct = async(id: string, price: number) => {
    setLoading(true);
    let idn = Number(id);
    try {
      marketplace.methods
        .purchaseProduct(idn)
        .send({ from: account, value: price })
        .on("receipt", function (receipt: any) {
          console.log("success");  
          dispatch(updateProduct({id: id, buyer:account}))        
        })
        .on("error", function (error: any) {
          window.alert(error.message);
          console.log("erorr")
        });        
        
        setLoading(false);
    } catch (error:any) {
      window.alert(error.message);
    }
  };

  /////////////////////////////////////

  const loadBlockchainData = async () => {
    const web3: Web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    try {
      const networkId : number= await web3.eth.net.getId();      
      const netId = networkId as unknown as keyof typeof Marketplace.networks       
      const networkData = Marketplace.networks[netId];       
      if (networkData) {
        const marketplaces: EthContract.Contract= await new web3.eth.Contract(
          Marketplace.abi as AbiItem[],
          networkData.address
        );
        setMarketplace(marketplaces);          
        const productCount = await marketplaces.methods.productCount().call();
        // Load products
        let productarray: Product[] = [];
        for (var i = 1; i <= productCount; i++) {
          const product: Product = await marketplaces.methods.products(i).call();
          productarray.push({
            id: product.id,
            name: product.name,
            price: product.price,
            owner: product.owner,
            purchased: product.purchased
          })
        }
        dispatch(setProduct({count:productarray.length, products:productarray}))            
        setLoading(false);    
      } else {
        window.alert("Marketplace contract not deployed to detected network.");
    }}
    catch (error) {
      window.alert("network not detected.");
    }  
  };
  useEffect(()=>{
    setProducts(productsFromRedux?.products || [])
  },[productsFromRedux])

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, [account]);

  window.ethereum.on("accountsChanged", function (accounts: any) {
    setAccount(accounts);
    loadBlockchainData();
  });
  return (
    <div>
      <Navbar account={account} />
      <main>
        {loading ? (
          <div
            style={{
              backgroundColor: "#ffffffa6",
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={loader} alt="" />
          </div>
        ) : null}
        {error ? (
          <div
            style={{
              backgroundColor: "#ffffffa6",
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>{error}</h1>
            <button onClick={()=>{setError(false)}}>close</button>
          </div>
        ) : null}

        <Main
          createProduct={createProduct}
          products={products}
          purchaseProduct={purchaseProduct}
          account={account}
        />


      </main>
    </div>
  );
};

export default App;






















