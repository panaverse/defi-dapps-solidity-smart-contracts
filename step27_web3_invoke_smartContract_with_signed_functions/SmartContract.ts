import Web3 from "web3";
import EthContract from "web3-eth-contract";
import { Transaction, TxData } from "ethereumjs-tx";

// Ropsten Test Network endpoint.
const network = "ropsten";
const INFURA_PROJECT_ID = "INFURA_PROJECT_ID";
const RPC_ENDPOINT = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;

export class SmartContract {
  protected web3: Web3;
  protected contractAddress: string;
  protected abi: string;
  protected contract: EthContract.Contract;

  /**
   * Object representing a contract on Ethereum.
   * @param contractAddress address of the contract on Ethereum network.
   * @param abi ABI of the contract.
   */
  public constructor(contractAddress: string, abi: string) {
    this.contractAddress = contractAddress;
    this.abi = abi;
    this.web3 = new Web3(RPC_ENDPOINT);
    this.contract = new this.web3.eth.Contract(
      JSON.parse(this.abi),
      this.contractAddress
    );
  }

  /**
   * Get the public address of the contract on Ethereum network.
   * @returns public address of the contract.
   */
  public getContractAddress(): string {
    return this.contractAddress;
  }

  /**
   * Get the public address of current owner of the smart contract.
   * @returns public address of current owner of the smart contract.
   */
  getContractOwner = async () => {
    return await this.contract.methods.getOwner().call();
  };

  /**
   * Transfer the ownership of the smart contract to some other Ethereum account.
   * @param newOwnerAddress public address of the new owner.
   * @param previousOwnerPrivateKey privateKey of the previous owner.
   * @param gasLimit maximumm amount of gas you want to allow for this transaction.
   * @param gasPriceGwei gasPrice in Gwei you want to pay for this transaction.
   * @returns transaction object for transferring the ownership.
   */
  changeContractOwner = async (
    newOwnerAddress: string,
    previousOwnerPrivateKey: string,
    gasLimit: number,
    gasPriceGwei: number
  ) => {
    const previousOwnerAddress = await this.getContractOwner();
    // Build the transaction
    const txCount = await this.web3.eth.getTransactionCount(
      previousOwnerAddress
    );
    const txData: TxData = {
      nonce: this.web3.utils.toHex(txCount),
      to: this.contractAddress,
      data: this.contract.methods.changeOwner(newOwnerAddress).encodeABI(),
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(
        this.web3.utils.toWei(gasPriceGwei.toString(), "gwei")
      ),
    };

    // Sign the transaction
    const tx = new Transaction(txData, { chain: "ropsten" });
    tx.sign(Buffer.from(previousOwnerPrivateKey, "hex"));
    const serializedTx = tx.serialize();
    const rawTx = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    return await this.web3.eth.sendSignedTransaction(rawTx);
  };
}
