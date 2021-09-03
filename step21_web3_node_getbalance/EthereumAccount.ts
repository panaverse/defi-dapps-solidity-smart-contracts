import Web3 from 'web3';

//https://www.typescriptlang.org/docs/handbook/2/classes.html
export class EthereumAccount {

  private web3: Web3;
  private address: string;

  // Got an Default Account Address from Etherscan: https://etherscan.io/accounts
  public constructor(address:string) {
    this.address = address;
    // Create a project on infura.io and copy the ropsten testnetwork endpoint and paste it here
    this.web3 = new Web3("ENTER_INFURE_NODE_URL");

  }

  // returns the address
  public getAddress(): string {
    return this.address;
  }

  // returns the balance of the address
  public async getBalance():Promise<string | number> {
    return await this.web3.eth.getBalance(this.address);
  }

  
}