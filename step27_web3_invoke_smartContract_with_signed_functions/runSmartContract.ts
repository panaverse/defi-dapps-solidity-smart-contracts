import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx'


export class RunSmartContract {
  private web3: Web3

  public constructor() {

    // use ropsten endpoint here (dont use main because we are just sending ethers for testing)
    this.web3 = new Web3("your_ropsten_endpoint");
  }


  public async changeOwnerFunction(publicAddress: string, PrivateKey: string, contractAddress: string, gasLimit: number, gasPriceGwei: number, contractAbi: any, newOwner: string) {

    // we are getting the last transaction number for nonce
    const senderTransactionCount = await this.web3.eth.getTransactionCount(publicAddress)


    // get contract reference
    const contract = new this.web3.eth.Contract(contractAbi, contractAddress);


    // everything needs to be in hex
    const txObject = {
      nonce: this.web3.utils.toHex(senderTransactionCount),
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(gasPriceGwei.toString(), 'gwei')),
      data: contract.methods.changeOwner(newOwner).encodeABI(), // ABI encoded function that you need to run
      to: contractAddress // transaction to your deployed contract
    }

    //-----------------sign the transaction

    const tx = new Transaction(txObject, { chain: 'ropsten' })
    tx.sign(Buffer.from(PrivateKey, 'hex'))
    const serializeTx = tx.serialize()
    const rawTx = '0x' + serializeTx.toString('hex')

    //------------------broadcast the transaction 

    const prevOwner = await contract.methods.getOwner().call()

    console.log('prevOwner', prevOwner)

    const txSent = await this.web3.eth.sendSignedTransaction(rawTx)

    const getOwner = await contract.methods.getOwner().call()

    console.log('newOwner', getOwner)

    return txSent

  }






}

