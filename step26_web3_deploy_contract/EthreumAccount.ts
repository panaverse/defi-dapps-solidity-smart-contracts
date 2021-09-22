import Web3 from "web3";
import { Transaction, TxData } from "ethereumjs-tx";

// Ropsten Test Network endpoint.
const network = "ropsten";
const INFURA_PROJECT_ID = "INFURA_PROJECT_ID";
const RPC_ENDPOINT = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;

export class EthereumAccount {
  private web3: Web3;
  private privateKey?: string;
  private address: string;

  /**
   * Instantiate an Ethereum Account object.
   * @param address public address of the Ethereum account.
   * @param privateKey (Optional) private key of the Ethereum account
   */
  constructor(address: string, privateKey?: string) {
    this.address = address;
    this.privateKey = privateKey;
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
   * Signs and sends the transaction to Ethereum block chain.
   * @param txDataParam data for the transaction.
   * @returns transaction object for the transaction.
   */
  private signAndSendTransaction = async (
    txDataParam: Omit<TxData, "nonce">
  ) => {
    if (!this.privateKey) {
      console.error("Private Key not provided!");
      return;
    }

    // Build the transaction
    const txCount = await this.web3.eth.getTransactionCount(this.address);
    const txData: TxData = {
      ...txDataParam,
      nonce: this.web3.utils.toHex(txCount),
    };

    // Sign the transaction
    const tx = new Transaction(txData, { chain: "ropsten" });
    tx.sign(Buffer.from(this.privateKey, "hex"));
    const serializedTx = tx.serialize();
    const rawTx = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    return await this.web3.eth.sendSignedTransaction(rawTx);
  };

  /**
   * Send Ethers from this account to another one with a signed transaction.
   * @param receiverAddress public address of receiver's account.
   * @param ethersAmount amount of Ethers to send.
   * @param gasLimit maximumm amount of gas you want to allow for this transaction.
   * @param gasPriceGwei gasPrice in Gwei you want to pay for this transaction.
   * @returns transaction object for sending Ethers.
   */
  sendSignedTransaction = async (
    receiverAddress: string,
    ethersAmount: number,
    gasLimit: number,
    gasPriceGwei: number
  ) => {
    return await this.signAndSendTransaction({
      to: receiverAddress,
      value: this.web3.utils.toHex(
        this.web3.utils.toWei(ethersAmount.toString(), "ether")
      ),
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(
        this.web3.utils.toWei(gasPriceGwei.toString(), "gwei")
      ),
    });
  };

  /**
   * Deploy a smart contract to Ethereum block chain.
   * @param smartContractByteCode bytecode of the compiled smart contract.
   * @param gasLimit maximumm amount of gas you want to allow for this transaction.
   * @param gasPriceGwei gasPrice in Gwei you want to pay for this transaction.
   * @returns transaction object for deploying the smart contract.
   */
  deploySmartContract = async (
    smartContractByteCode: string,
    gasLimit: number,
    gasPriceGwei: number
  ) => {
    return await this.signAndSendTransaction({
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(
        this.web3.utils.toWei(gasPriceGwei.toString(), "gwei")
      ),
      data: smartContractByteCode,
    });
  };
}
