import React from "react";
import ReactDOM from "react-dom";
import { Web3React } from "./components/web3ReactProvider";
import { AppContextProvider } from "./context/appContextProvider";
import App from "./components/app";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Web3React>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Web3React>
  </React.StrictMode>,
  document.getElementById("root")
);
