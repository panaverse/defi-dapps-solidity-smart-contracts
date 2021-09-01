import { SmartContract } from "./SmartContract";

export class ERC20Token extends SmartContract {
  /**
   * Get the name of the token mentioned in its smart contract.
   * @returns name of the token.
   */
  public async getTokenName() {
    return await this.contract.methods.name().call();
  }

  /**
   * Get the symbol of the token mentioned in its smart contract.
   * @returns symbol of the token.
   */
  public async getTokenSymbol() {
    return await this.contract.methods.symbol().call();
  }

  /**
   * Get the number of decimal places when representing DAIs.
   * @returns number of decimal places.
   */
  public async getNumDecimals() {
    return await this.contract.methods.decimals().call();
  }

  /**
   * Get total number of tokens minted.
   * @returns total supply of the token in the market.
   */
  public async getTotalSupply() {
    const totalSupply = await this.contract.methods.totalSupply().call();
    const numDecimals = await this.getNumDecimals();
    return totalSupply / 10 ** numDecimals;
  }

  /**
   * Get the number of tokens held by an account.
   * @param accountAddress public address of the account.
   * @returns number of tokens held by the provided account.
   */
  public async getAccountBalance(accountAddress: string) {
    const balance = await this.contract.methods
      .balanceOf(accountAddress)
      .call();
    const numDecimals = await this.getNumDecimals();
    return balance / 10 ** numDecimals;
  }
}
