import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx'


export class EthereumAccount {
  private web3: Web3;
  private address: string ;
  private privateKey?: any ;
  
  public constructor(publicAddress:string , privateKey?:any) {
    this.address = publicAddress;
    this.privateKey = privateKey;
    // use ropsten endpoint here (dont use main because we are just sending ethers for testing)
    this.web3 = new Web3(new Web3.providers.HttpProvider("ENTER_INFURA_ROPSTEN_ENDPOINT"));
  }


  // Here we are checking balance for account1 but we can check for any by changing the address
  public async getAccount1Balance() {
    const balance = await this.web3.eth.getBalance(this.address)
    return this.web3.utils.fromWei(balance, 'ether')
  }


  public async sendSignedTransactionFromAccount1(recieverPublicAddress: string, ethers: number, gasLimit: number, gasPriceGwei: number) {

    //----------------create transaction 

    // we are getting the last transaction number for nonce. If transaction is happeing from this account for the first time
    // the count will be 1
    const senderTransactionCount = await this.web3.eth.getTransactionCount(this.address)

    // everything needs to be in hex
    const txObject = {
      nonce: this.web3.utils.toHex(senderTransactionCount),
      to: recieverPublicAddress,
      value: this.web3.utils.toHex(this.web3.utils.toWei(ethers.toString(), 'ether')),
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(gasPriceGwei.toString(), 'gwei'))
    }

    //-----------------sign the transaction

    const tx = new Transaction(txObject, { chain: 'ropsten' })
    tx.sign(Buffer.from(this.privateKey, 'hex'))
    const serializeTx = tx.serialize()
    const rawTx = '0x' + serializeTx.toString('hex')

    //------------------broadcast the transaction 

    await this.web3.eth.sendSignedTransaction(rawTx, (err) => {
      // if transaction fails then error will be returned
      if (err) {
        return err
      }
      // we are calling an event "receipt" which will return as receipt of transaction after it has been broadcasted to blockchain
    }).on("receipt" , (receipt) => {
      console.log("receipt" , receipt)
      return receipt
    });
    


  }


}

