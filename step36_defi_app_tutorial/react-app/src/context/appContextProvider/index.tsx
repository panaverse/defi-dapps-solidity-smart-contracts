import { FC, useState, createContext, useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import Web3 from "web3";
import { injector } from "../../components/wallet";
import { MyToken } from "../../contracts/types/MyToken";
import { FarmToken } from "../../contracts/types/FarmToken";
import MyTokenAbi from "../../contracts/abi/MyToken.json";
import FarmTokenAbi from "../../contracts/abi/FarmToken.json";
import { State } from "../../react-app-env";

// Types of these env variables are declared in `react-app-env.d.ts`;
// so, we can have IntelliSense help us.
const MY_TOKEN_ADDRESS = process.env.REACT_APP_MY_TOKEN_CONTRACT_ADDRESS;
const FARM_TOKEN_ADDRESS = process.env.REACT_APP_FARM_TOKEN_CONTRACT_ADDRESS;

const initialState: State = {
  loading: false,
  errorMsg: "",
  isEthereumAvailable: false,
  connected: false,
  connect: async () => {},
  disconnect: () => {},
  account: null,
  myTokenBalanceOfUser: 0,
  farmTokenBalanceOfUser: 0,
  myTokenBalanceOfFarm: 0,
  farmAllowance: 0,
  allowFarm: async (_: number) => {},
  depositInFarm: async (_: number) => {},
  withdrawFromFarm: async (_: number) => {},
};

const AppContext = createContext<State>(initialState);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC = ({ children }) => {
  const {
    activate,
    active: connected,
    deactivate,
    account,
    error,
    library: web3,
  } = useWeb3React<Web3>();
  const [errorMsg, setErrorMsg] = useState(initialState.errorMsg);
  const [loading, setLoading] = useState(initialState.loading);
  const isEthereumAvailable = !(error instanceof NoEthereumProviderError);
  const [myToken, setMyToken] = useState<MyToken | null>(null);
  const [farmToken, setFarmToken] = useState<FarmToken | null>(null);
  const [myTokenBalanceOfUser, setMyTokenBalanceOfUser] = useState(0);
  const [farmTokenBalanceOfUser, setFarmTokenBalanceOfUser] = useState(0);
  const [myTokenBalanceOfFarm, setMyTokenBalanceOfFarm] = useState(0);
  const [farmAllowance, setFarmAllowance] = useState(0);
  const ConnectToMetaMaskError = new Error("Connect to MetaMask!");
  const ErrorUpdatingOnSubscribedValue = new Error(
    "Error updating on subscribed value."
  );

  const resetError = () => {
    setErrorMsg("");
  };

  /**
   * An error handling wrapper for functions to avoid code duplication.
   */
  const errorWrapper = async (fn: () => void) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await fn();
      setErrorMsg("");
    } catch (error) {
      // console.log({ error });
      if (typeof error === "object") {
        const _err = error as any;
        setErrorMsg(_err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sets `myToken` and `farmToken` state values to `MyToken` and `FarmToken`
   * contract objects using `web3` when the user connects to wallet. Sets
   * `myToken` and `farmToken` to `null` otherwise.
   */
  const createTokenContractObjects = () => {
    errorWrapper(() => {
      if (!connected || !web3) {
        destroyTokenContractObjects();
        throw ConnectToMetaMaskError;
      }
      setMyToken(
        new web3.eth.Contract(MyTokenAbi as any, MY_TOKEN_ADDRESS) as any
      );
      setFarmToken(
        new web3.eth.Contract(FarmTokenAbi as any, FARM_TOKEN_ADDRESS) as any
      );
    });
  };

  /**
   * Sets `myToken` and `farmToken` state values to `null`.
   */
  const destroyTokenContractObjects = () => {
    setMyToken(null);
    setFarmToken(null);
  };

  /**
   * Connect to MetaMask wallet.
   */
  const connect = async () => {
    await errorWrapper(async () => {
      await activate(injector);
      resetError();
    });
  };

  /**
   * Disconnect from MetaMask wallet.
   */
  const disconnect = () => {
    errorWrapper(() => {
      deactivate();
      resetError();
    });
  };

  /**
   * Approve `FarmToken` contract to spend `tokensToAllow` number of `MTKN`
   * from current user's account.
   * @param tokensToAllow Number of `MTKN` to approve.
   */
  const allowFarm = async (tokensToAllow: number) => {
    await errorWrapper(async () => {
      if (!web3 || !account || !myToken) {
        console.log({ web3, account, myToken });
        throw ConnectToMetaMaskError;
      }
      const inWei = web3.utils.toWei(tokensToAllow.toString(), "ether");
      await web3.eth.sendTransaction({
        from: account,
        to: MY_TOKEN_ADDRESS,
        data: myToken.methods.approve(FARM_TOKEN_ADDRESS, inWei).encodeABI(),
      });
    });
  };

  /**
   * Deposit `tokensToDeposit` number of `MTKN` to `FarmToken` contract address
   * from current user's address. User gets an equal number of `FRM` tokens in
   * his/her account. `tokensToDeposit` should be less than the allowance.
   * @param tokensToDeposit Number of `MTKN` to deposit.
   */
  const depositInFarm = async (tokensToDeposit: number) => {
    await errorWrapper(async () => {
      if (!web3 || !account || !farmToken) {
        throw ConnectToMetaMaskError;
      }
      const inWei = web3.utils.toWei(tokensToDeposit.toString(), "ether");
      await web3.eth.sendTransaction({
        from: account,
        to: FARM_TOKEN_ADDRESS,
        data: farmToken.methods.deposit(inWei).encodeABI(),
      });
    });
  };

  /**
   * Withdraw `tokensToWithdraw` number of `MTKN` from `FarmToken` contract
   * address. User returns an equal number of `FRM` tokens to `FarmToken`
   * contract for the withdrawal.
   * @param tokensToDeposit Number of `MTKN` to withdraw.
   */
  const withdrawFromFarm = async (tokensToWithdraw: number) => {
    await errorWrapper(async () => {
      if (!web3 || !account || !farmToken) {
        throw ConnectToMetaMaskError;
      }
      const inWei = web3.utils.toWei(tokensToWithdraw.toString(), "ether");
      await web3.eth.sendTransaction({
        from: account,
        to: FARM_TOKEN_ADDRESS,
        data: farmToken.methods.withDraw(inWei).encodeABI(),
      });
    });
  };

  /**
   * Gets the number of `MTKN` and `FRM` tokens the user and the `FarmToken`
   * contract have.
   */
  const getBalances = async () => {
    await errorWrapper(async () => {
      if (!connected || !web3 || !myToken || !account || !farmToken) {
        setMyTokenBalanceOfUser(0);
        setMyTokenBalanceOfFarm(0);
        setFarmTokenBalanceOfUser(0);
        throw ConnectToMetaMaskError;
      }
      // #1: MKTN tokens in possession of USER
      let b = await myToken.methods.balanceOf(account).call();
      b = web3.utils.fromWei(b, "ether");
      setMyTokenBalanceOfUser(+b);

      // #2: MKTN tokens in possession of FARM
      b = await myToken.methods.balanceOf(FARM_TOKEN_ADDRESS).call();
      b = web3.utils.fromWei(b, "ether");
      setMyTokenBalanceOfFarm(+b);

      // #3: FRM tokens in possession of USER
      b = await farmToken.methods.balanceOf(account).call();
      b = web3.utils.fromWei(b, "ether");
      setFarmTokenBalanceOfUser(+b);
    });
  };

  /**
   * Gets the number of `MTKN` tokens `FarmToken` contract is allowed to spend
   * from the current user's account.
   */
  const getFarmAllowance = async () => {
    await errorWrapper(async () => {
      if (!connected || !web3 || !myToken || !account) {
        setFarmAllowance(0);
        throw ConnectToMetaMaskError;
      }
      let allowance = await myToken.methods
        .allowance(account, FARM_TOKEN_ADDRESS)
        .call();
      allowance = web3.utils.fromWei(allowance, "ether");
      setFarmAllowance(+allowance);
    });
  };

  /**
   * Updates the balances and allowance. It is used in
   * `subscribeForBalanceUpdates` to update balances and allowance whenever a
   * subscribed event is received.
   */
  const updateOnSubscribedValues = async () => {
    await getBalances();
    await getFarmAllowance();
    console.log("Updated!");
  };

  /**
   * Subscribes to `Approval` and `Transfer` events from `MyToken` contract to
   * update user's and `FarmToken` contract's balances and allowance.
   */
  const subscribeForBalanceUpdates = async () => {
    await errorWrapper(async () => {
      if (!connected || !web3 || !myToken || !account) {
        throw ConnectToMetaMaskError;
      }
      // Subscribe to Approval event from `MyToken` contract.
      myToken.events.Approval(async (err, result) => {
        if (err) {
          throw ErrorUpdatingOnSubscribedValue;
        }
        await updateOnSubscribedValues();
      });
      // Subscribe to Transfer event from `MyToken` contract.
      myToken.events.Transfer(async (err, result) => {
        if (err) {
          throw ErrorUpdatingOnSubscribedValue;
        }
        await updateOnSubscribedValues();
      });
      console.log("Subscribed!");
    });
  };

  /**
   * Tries to set the `myToken` and `farmToken` state values to `MyToken` and
   * `FarmToken` contract objects respectively whenever the user connects or
   * disconnects from the wallet.
   * Note: We are using `web3` instead of `connected` in the dependency list
   * to make this effect run on connect or disconnect events. This is because
   * sometimes when the user connects to the wallet, `connected` changes to
   * true, but `web3` may still be `null` or `undefined`. This is an internal
   * problem of `@web3-react`.
   * Note: Try to play with the dependency list. 😉
   */
  useEffect(() => {
    createTokenContractObjects();
  }, [web3]);

  /**
   * Tries to get balances and allowance when the user connects to the wallet.
   * Note: That this time we are using `myToken` and `farmToken` in the
   * dependency list instead of `web3`. This is to make sure that `myToken` and
   * `farmToken` state values are set before we try to fetch balances and
   * allowances.
   * Note: We are also using `account` in the dependency list to run this effect
   * when the user is already connected to the wallet and changes his/her
   * account in MetaMask.
   * Note: Try to play with the dependency list. 😉
   */
  useEffect(() => {
    getBalances();
    getFarmAllowance();
  }, [myToken, farmToken, account]);

  /**
   * This effect is responsible for subscribing to `Transfer` and `Approval`
   * events from `MyToken` samrt contract.
   * Note: We are using `myToken` in the dependency list instead of `web3`. This
   * is to make sure that `myToken` state value is set before we try to
   * subscribe to events.
   * Note: Try to play with the dependency list. 😉
   */
  useEffect(() => {
    subscribeForBalanceUpdates();
  }, [myToken]);

  const value: State = {
    // ...initialState,
    loading,
    errorMsg,
    isEthereumAvailable,
    connected,
    connect,
    disconnect,
    account,
    myTokenBalanceOfUser,
    farmTokenBalanceOfUser,
    myTokenBalanceOfFarm,
    farmAllowance,
    allowFarm,
    depositInFarm,
    withdrawFromFarm,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
