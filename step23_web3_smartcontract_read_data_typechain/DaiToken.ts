import Web3 from "web3";
import { Dai } from "./types/web3-v1-contracts/dai";
import daiAbi from "./abi/dai.json";

const RPC_ENDPOINT = "https://mainnet.infura.io/v3/INFURA_PROJECT_ID";

export class DaiToken {
  private static readonly DAI_ADDRESS =
    "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  private static readonly DAI_ABI = JSON.stringify(daiAbi);

  private web3: Web3;
  private dai: Dai;

  /**
   * Object representing the Dai Token Contract on Ethereum.
   */
  public constructor() {
    this.web3 = new Web3(RPC_ENDPOINT);
    this.dai = new this.web3.eth.Contract(
      JSON.parse(DaiToken.DAI_ABI),
      DaiToken.DAI_ADDRESS
    ) as any as Dai;
  }

  /**
   * Get the public address of the contract on Ethereum network.
   * @returns public address of the contract.
   */
  public getContractAddress(): string {
    return DaiToken.DAI_ADDRESS;
  }

  /**
   * Get full name of DAI token mentioned in its smart contract.
   * @returns full name of DAI token.
   */
  public async getTokenName() {
    return await this.dai.methods.name().call();
  }

  /**
   * Get the symbol of DAI token mentioned in its smart contract.
   * @returns symbol of DAI token.
   */
  public async getTokenSymbol() {
    return await this.dai.methods.symbol().call();
  }

  /**
   * Get the number of decimal places when representing DAIs.
   * @returns number of decimal places.
   */
  public async getNumDecimals() {
    return await this.dai.methods.decimals().call();
  }

  /**
   * Get total number of DAIs minted.
   * @returns total supply of DAIs in the market.
   */
  public async getTotalSupply() {
    const totalSupply = await this.dai.methods.totalSupply().call();
    const numDecimals = await this.getNumDecimals();
    return +totalSupply / 10 ** +numDecimals;
  }

  /**
   * Get the number of DAIs held by an account.
   * @param accountAddress public address of the account.
   * @returns number of DAIs held by the provided account.
   */
  public async getAccountBalance(accountAddress: string) {
    const balance = await this.dai.methods.balanceOf(accountAddress).call();
    const numDecimals = await this.getNumDecimals();
    return +balance / 10 ** +numDecimals;
  }
}
