import Web3 from 'web3';
import EthContract from 'web3-eth-contract';

export class SmartContract {
    private web3: Web3
   
    public constructor() {

      // use ganache rpc server endpoint here

      // ganache is a block chain that runs on your local machine. You can download it from https://www.trufflesuite.com/ganache
        this.web3 = new Web3("http://127.0.0.1:7545");
    }


    // get account balance
    public async getAccountBalance(account:string) {
      const balance =  await this.web3.eth.getBalance(account)
      return this.web3.utils.fromWei(balance,'ether')
    }

    // send transaction for unlocked account (the node takes care of the signing) - only secure if you trust the node.
    public async sendTransaction(sender:string, reciever:string,ethers:number) {
      return await this.web3.eth.sendTransaction({from:sender,to:reciever,value:this.web3.utils.toWei(ethers.toString(),'ether')})
    }

   

  }