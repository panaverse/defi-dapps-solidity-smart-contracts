import Web3 from 'web3';
import {Transaction} from 'ethereumjs-tx'

export class SmartContract {
    private web3: Web3
   
    public constructor() {

      // use ropsten endpoint here (dont use main because we are just sending ethers for testing)
        this.web3 = new Web3("USE_ROPSTON_ENDPOINT");
    }


    // check account balance for any account
    public async getAccountBalance(account:string) {
      const balance =  await this.web3.eth.getBalance(account)
      return this.web3.utils.fromWei(balance,'ether')
    }


    public async sendSignedTransaction(senderPublicAddress:string,senderPrivateKey:string, recieverPublicAddress:string,ethers:number,gasLimit:number,gasPriceGwei:number) {

      //----------------create transaction 

      // we are getting the last transaction number for nonce
     const senderTransactionCount = await this.web3.eth.getTransactionCount(senderPublicAddress)

     // everything needs to be in hex
     const txObject = {
       nonce: this.web3.utils.toHex(senderTransactionCount),
       to: recieverPublicAddress,
       value: this.web3.utils.toHex(this.web3.utils.toWei(ethers.toString(),'ether')),
       gasLimit: this.web3.utils.toHex(gasLimit),
       gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(gasPriceGwei.toString(),'gwei'))

     }

     //-----------------sign the transaction

     const tx = new Transaction(txObject, {chain: 'ropsten'})
     tx.sign(Buffer.from(senderPrivateKey,'hex'))
     const serializeTx = tx.serialize()
     const rawTx = '0x' + serializeTx.toString('hex')

     //------------------broadcast the transaction 

    return await this.web3.eth.sendSignedTransaction(rawTx)

    }

   

  }

