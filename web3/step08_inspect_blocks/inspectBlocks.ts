import Web3 from 'web3';


export class InspectBlocks {
  private web3: Web3


  public constructor() {

    // use mainnet endpoint here 
    this.web3 = new Web3("Enter_your_mainnet_RPC_endpoint");


  }

  public async getBlockNumber() {

    return await this.web3.eth.getBlockNumber()

  }


  public async fetchBlock(block: string | number) {

    return await this.web3.eth.getBlock(block)

  }


  public async getBlockTransactionCount(block: string | number) {

    return await this.web3.eth.getBlockTransactionCount(block)

  }


  public async getTransactionFromBlock(block: string | number, transactionNumber: number) {

    return await this.web3.eth.getTransactionFromBlock(block, transactionNumber)

  }






}

