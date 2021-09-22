import Web3 from "web3";

// Create a new project on Infura and replace PROJECT_ID
// in the following line with your Infura project id.
const RPC_ENDPOINT = "https://mainnet.infura.io/v3/PROJECT_ID";

//https://www.typescriptlang.org/docs/handbook/2/classes.html
export class EthereumAccount {
  private web3: Web3;
  private address: string;

  /**
   * Instantiate an Ethereum Account object.
   * @param address Public address of the account on Ethereum Network.
   */
  public constructor(address: string) {
    this.address = address;
    this.web3 = new Web3(RPC_ENDPOINT);
  }

  /**
   * Get the public address of the Ethereum account.
   * @returns public address of the Ethereum account.
   */
  public getAddress(): string {
    return this.address;
  }

  /**
   * Get the number of Ethers in the Ethereum account.
   * @returns Ethers (ETH) in the Ethereum account.
   */
  public async getBalance() {
    const balance = await this.web3.eth.getBalance(this.address);
    return this.web3.utils.fromWei(balance, "ether");
  }
}
