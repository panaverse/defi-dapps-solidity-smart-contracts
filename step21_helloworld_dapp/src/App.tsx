import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleStorage from './SimpleStorage';
import { MetaMaskInpageProvider } from "@metamask/providers";
import {ethers} from 'ethers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

function App() {
  return (
    <SimpleStorage/>
  );
}

export default App;
