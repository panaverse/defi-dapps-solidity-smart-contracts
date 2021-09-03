import Web3 from 'web3';

import { Dai } from './types/web3-v1-contracts/dai'
const dai_abi = require('./abi/dai.json')

export class SmartContract {
    private static readonly DAI_ADDRESS: string = 'ENTER_DAI_ADDRESS';
    
    private web3: Web3;
    private contractAddress: string;
    private dai: Dai;
   
    // Get a Default Smart Contract Address from Etherscan: https://etherscan.io/accounts
    public constructor(contractAddress: string = SmartContract.DAI_ADDRESS) {
        this.contractAddress = contractAddress;
        this.web3 = new Web3("ENTER_INFURA_NODE_URL");
        this.dai = (new this.web3.eth.Contract(dai_abi, this.contractAddress) as any) as Dai
    }

    // returns the public address of smart contract deployed on the ethereum 
    public getContractAddress(): string {
      return this.contractAddress;
    }

    // returns the name of the contract mention in the smart contract
    public async getContractName() {
      return await this.dai.methods.name().call();
    }

    // returns the symbol of the smart contract
    public async getContractSymbol() {
      return await this.dai.methods.symbol().call();
    }

    // returns the total supply of DAI
    public async getTotalSupply() {
      return await this.dai.methods.totalSupply().call();
    }

    // returns the total balance of an account by its public address
    public async getAccountBalance(accountAddress: string) {
      return await this.dai.methods.balanceOf(accountAddress).call()
    }

  }