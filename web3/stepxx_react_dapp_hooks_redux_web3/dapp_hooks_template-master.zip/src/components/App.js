import { useSelector, useDispatch } from "react-redux"
import { ThemeProvider } from "styled-components"
import { update } from "../store/interactions"
import { GlobalStyles } from "../styles/rest"
import Content from "./Content"
import React from "react"
import Nav from "./Nav"

export default function App() {
  const connection = useSelector(state => state.connection);
  const currentTheme = useSelector(state => state.currentTheme);

  const dispatch = useDispatch();

  if(window.ethereum && connection===null){
    update(dispatch)

    window.ethereum.on('accountsChanged', async () => { await update(dispatch) });
    window.ethereum.on('chainChanged', async () => { await update(dispatch) });
  }
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
        <Nav />
      <Content />
    </ThemeProvider>
  );
}