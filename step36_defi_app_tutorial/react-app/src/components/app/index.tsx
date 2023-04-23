import { FC } from "react";
import { useAppContext } from "../../context/appContextProvider";

export const App: FC = () => {
  const {
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
  } = useAppContext();

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <button onClick={connect} disabled={connected}>
            Connect to MetaMask
          </button>
          <button onClick={disconnect} disabled={!connected || loading}>
            Disconnect
          </button>
        </div>
        {!isEthereumAvailable && <p id="error">MetaMask not installed!</p>}
        <p>{connected ? `Connected with ${account}` : "Not Connected"}</p>
        {connected && (
          <>
            <div className="container">
              <div className="item">
                <h3>User</h3>
                <p>
                  {myTokenBalanceOfUser} MTKN, {farmTokenBalanceOfUser} FRM
                </p>
              </div>
              <div className="item">
                <h3>Farm</h3>
                <p>{myTokenBalanceOfFarm} MTKN, 0 FRM</p>
              </div>
            </div>
            <p>Farm's Allowance: {farmAllowance} MTKN</p>
            <button onClick={() => allowFarm(10)} disabled={loading}>
              Allow Farm to get 10 MTKN
            </button>
            <button onClick={() => allowFarm(0)} disabled={loading}>
              Reset Farm Allowance
            </button>
            <button onClick={() => depositInFarm(10)} disabled={loading}>
              Deposit 10 MKTN in Farm
            </button>
            <button onClick={() => withdrawFromFarm(10)} disabled={loading}>
              Withdraw 10 MKTN from Farm
            </button>
            {errorMsg && <pre id="error">{errorMsg}</pre>}
          </>
        )}
      </header>
    </div>
  );
};

export default App;
