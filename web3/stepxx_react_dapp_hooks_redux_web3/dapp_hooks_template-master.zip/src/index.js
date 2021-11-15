import { configureStore } from "./store/configureStore"
import { Provider } from "react-redux"
import App from "./components/App"
import ReactDOM from "react-dom"
import React from "react"

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);