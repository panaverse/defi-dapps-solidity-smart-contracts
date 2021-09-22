import Web3 from "web3";

const network = "mainnet";
const INFURA_PROJECT_ID = "INFURA_PROJECT_ID";
const RPC_ENDPOINT = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;

export class EthNetwork {
  private web3: Web3;

  /**
   * Creates an instance of EthNetwork object.
   */
  constructor() {
    this.web3 = new Web3(RPC_ENDPOINT);
  }

  /**
   * Get the number of the latest block on Ethereum Mainnet.
   * @returns latest block number.
   */
  public getLatestBlockNumber = async () => {
    return await this.web3.eth.getBlockNumber();
  };

  /**
   * Fetch a block of given number or hash from the Ethereum Mainnet.
   * @param block number or hash of the block.
   * @returns a block of given number or Hash.
   */
  public getBlock = async (block: number | string) => {
    return await this.web3.eth.getBlock(block);
  };

  /**
   * Get the number of transaction in a block of given number or Hash.
   * @param block (Optional) Hash or number of the block- default is "latest".
   * @returns number of transactions in the block.
   */
  public getBlockTransactionCount = async (
    block: string | number = "latest"
  ) => {
    return await this.web3.eth.getBlockTransactionCount(block);
  };

  /**
   * Get a specific transaction from a block of given number.
   * @param trxIndex index of the transaction in the block.
   * @param block (Optional) Hash or number of the block- default is "latest".
   * @returns transactions object for the required transaction.
   */
  public getTransactionFromBlock = async (
    trxIndex: number,
    block: string | number = "latest"
  ) => {
    return await this.web3.eth.getTransactionFromBlock(block, trxIndex);
  };

  /**
   * Fetch a given number of latest blocks from Ethereum Mainnet.
   * @param numberOfBlocks (Optional) number of blocks to fetch. Default is `10`.
   */
  public getLatestXBlocks = async (numberOfBlocks: number = 10) => {
    const latestBlock = await this.getLatestBlockNumber();

    let blocks: Array<any> = [];
    for (let i = 0; i < numberOfBlocks; ++i) {
      blocks.push(await this.getBlock(latestBlock - i));
    }
    return blocks;
  };
}
