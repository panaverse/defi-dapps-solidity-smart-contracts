import Web3 from 'web3';


export class Utils {
  private web3: Web3


  public constructor() {

    // use mainnet endpoint here 
    this.web3 = new Web3("ENTER_YOUR_MAINNET_RPC_ENDPOINT");


  }

  public async getAvgGasPrice() {

    const gasPrice = await this.web3.eth.getGasPrice()

    return this.web3.utils.fromWei(gasPrice, 'ether')

  }


  public async hashing(input: string) {

    return this.web3.utils.sha3(input)

  }


  public async Solidityhashing(input: string) {

    return this.web3.utils.soliditySha3(input)

  }


  public async generateRandomHex(byteSize: number) {

    return this.web3.utils.randomHex(byteSize)

  }

  








}

