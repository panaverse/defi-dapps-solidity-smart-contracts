import Web3 from "web3";

// URL of Ganache localhost.
const RPC_ENDPOINT = "http://127.0.0.1:7545";

export class EthereumAccount {
  private web3: Web3;
  private address: string;

  /**
   * Instantiate an Ethereum Account object.
   * @param address public address of an Ethereum account.
   */
  constructor(address: string) {
    this.address = address;
    this.web3 = new Web3(RPC_ENDPOINT);
  }

  /**
   * Get the public address of the Ethereum account.
   * @returns public address of the account.
   */
  getAddress = () => this.address;

  /**
   * Get the Ethers balance of the account.
   * @returns Ethers in the account.
   */
  getBalance = async () => {
    return await this.web3.eth
      .getBalance(this.address)
      .then(wei => this.web3.utils.fromWei(wei, "ether"));
  };

  /**
   * Send Ethers from this account to another one.
   * @param ethersAmount amount of Ethers to send.
   * @param receiverAddress public address of receiver's account.
   * @returns transaction object for sending Ethers.
   */
  sendEthers = async (ethersAmount: number, receiverAddress: string) => {
    return await this.web3.eth.sendTransaction({
      from: this.address,
      to: receiverAddress,
      value: this.web3.utils.toWei(ethersAmount.toString(), "ether"),
      gas: 21000,
      gasPrice: this.web3.utils.toWei(this.web3.utils.toBN(10), "gwei"),
    });
  };
}
