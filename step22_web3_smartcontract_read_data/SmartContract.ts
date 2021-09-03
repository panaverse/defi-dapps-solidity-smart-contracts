import Web3 from 'web3';
import EthContract from 'web3-eth-contract';

export class SmartContract {
    private static readonly DAI_ADDRESS: string = 'ENTER_DAI_ADDRESS';
    private static readonly DAI_ABI: string = 'ENTER_SMARTCONTRACT_ABI';
    
    private web3: Web3;
    private contractAddress: string;
    private abi: string;
    private contract: EthContract.Contract;
   
    // Got an Default Smart Contract Address from Etherscan: https://etherscan.io/accounts
    public constructor(contractAddress: string = SmartContract.DAI_ADDRESS, abi: string = SmartContract.DAI_ABI) {
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.web3 = new Web3("");
        // javascript representation of the smart contract
        this.contract = new this.web3.eth.Contract(JSON.parse(this.abi), this.contractAddress); 
    }

    // returns the address of the contract
    public getContractAddress(): string {
      return this.contractAddress;
    }

    // returns the contract name
    public async getContractName() {
      return await this.contract.methods.name().call();
    }

    // returns the symbol of the smart contract 
    public async getContractSymbol() {
      return await this.contract.methods.symbol().call();
    }

    // returns the total supply of the 
    public async getTotalSupply() {
      return await this.contract.methods.totalSupply().call();
    }

    // returns the balance of an account
    public async getAccountBalance(accountAddress: string) {
      return await this.contract.methods.balanceOf(accountAddress).call();
    }

  }