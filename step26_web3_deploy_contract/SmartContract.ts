import Web3 from "web3";
import EthContract from "web3-eth-contract";

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
}
