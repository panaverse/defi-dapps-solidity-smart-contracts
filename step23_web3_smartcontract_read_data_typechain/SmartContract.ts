import Web3 from 'web3';
import EthContract from 'web3-eth-contract';

import { Dai } from './types/web3-v1-contracts/dai'
const dai_abi = require('./abi/dai.json')

export class SmartContract {
    private static readonly DAI_ADDRESS: string = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
    
    private web3: Web3;
    private contractAddress: string;
    private dai: Dai;
   
    // Got an Default Smart Contract Address from Etherscan: https://etherscan.io/accounts
    public constructor(contractAddress: string = SmartContract.DAI_ADDRESS) {
        this.contractAddress = contractAddress;
        this.web3 = new Web3("https://mainnet.infura.io/v3/your_url");
        this.dai = (new this.web3.eth.Contract(dai_abi, this.contractAddress) as any) as Dai
    }

    public getContractAddress(): string {
      return this.contractAddress;
    }

    public async getContractName() {
      return await this.dai.methods.name().call();
    }

    public async getContractSymbol() {
      return await this.dai.methods.symbol().call();
    }

    public async getTotalSupply() {
      return await this.dai.methods.totalSupply().call();
    }

    
    public async getAccountBalance(accountAddress: string) {
      return await this.dai.methods.balanceOf(accountAddress).call()

    }

  }