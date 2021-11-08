import React, { useState } from "react";
import { Product } from "./types";

type MainProps = {
  createProduct: (name: string, price: number) => void;
  products: Product[] | undefined;
  purchaseProduct: (id: string, price: number) => void;
  account: string | undefined
};

const Main = ({ createProduct, products, purchaseProduct, account }: MainProps) => {
  const [productname, setProductname] = useState<string>("");
  const [productprice, setProductprice] = useState<number>(0);  

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div id="content">
        <h1 style={{ textAlign: "center" }}>Add Product</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let weiprice = window.web3.utils.toWei(productprice, 'ether');
            createProduct(productname, weiprice);
            setProductname("");
            setProductprice(0);
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ margin: "5px" }}>
              <h4>Name</h4>

              <div className="form-group mr-sm-2">
                <input
                  style={{ padding: "10px 20px", fontSize: "medium" }}
                  id="productName"
                  type="text"
                  value={productname}
                  onChange={(e) => {
                    setProductname(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Product Name"
                  required
                />
              </div>
            </div>
            <div style={{ margin: "5px" }}>
              <h4>Price</h4>

              <div className="form-group mr-sm-2">
                <input
                  style={{ padding: "10px 20px", fontSize: "medium" }}
                  id="productPrice"
                  type="number"
                  value={productprice}
                  onChange={(e) => {
                    setProductprice(e.target.value as unknown as number);
                  }}
                  className="form-control"
                  placeholder="Product Price"
                  required
                />
              </div>
            </div>
          </div>
          <button
            style={{
              alignSelf: "center",
              margin: "5px",
              backgroundColor: "grey",
              border: "none",
              padding: "10px",
              color: "white",
              cursor: "pointer",
            }}
            type="submit"
            className="btn btn-primary"
          >
            Add Product
          </button>
        </form>
        <p> </p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {products?.map((item, i) => {
      let ethprice = window.web3.utils.fromWei(item.price, 'ether');
              return (
               
                <tr key={i}>
                  <th scope="row">{item.id}</th>
                  <td>Name: {item.name}</td>
                  <td>Price In Eth: {ethprice}</td>
                  <td>Owner: {item.owner}</td>

                  <td>
                    {item.purchased ? (
                      <button
                        style={{
                          alignSelf: "center",
                          margin: "5px",
                          backgroundColor: "grey",
                          border: "none",
                          padding: "10px",
                          color: "white",
                          cursor: "pointer",
                        }}
                        className="buyButton"
                      >
                        {item.owner === account ? "Purchased":"Sold"}
                      </button>
                    ) : (
                      <button
                      disabled={item.owner === account ? true: false}
                      onClick={()=>{
                        let pricep = Number(item.price)
                        purchaseProduct(item.id, pricep)
                      }}
                        style={{
                          alignSelf: "center",
                          margin: "5px",
                          backgroundColor: "grey",
                          border: "none",
                          padding: "10px",
                          color: "white",
                          cursor: `${item.owner === account ? "": "pointer"}`,
                        }}
                        className="buyButton"
                      >
                       Buy
                      </button>
                    )}
                  </td>
                </tr>
             
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
