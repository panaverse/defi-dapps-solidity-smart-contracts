import Web3 from 'web3';
import {Transaction} from 'ethereumjs-tx'


export class DeploySmartContract {
    private web3: Web3
   
    public constructor() {

      // use ropsten endpoint here (dont use main because we are just sending ethers for testing)
        this.web3 = new Web3("Your ropsten endpoint");
    }


    public async deploy(publicAddress:string,PrivateKey:string,gasLimit:number,gasPriceGwei:number,data:string) {

      //----------------create transaction 

      // we are getting the last transaction number for nonce
     const senderTransactionCount = await this.web3.eth.getTransactionCount(publicAddress)


     // everything needs to be in hex
     const txObject = {
       nonce: this.web3.utils.toHex(senderTransactionCount),
       gasLimit: this.web3.utils.toHex(gasLimit),
       gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(gasPriceGwei.toString(),'gwei')),
       data: data

     }

     //-----------------sign the transaction

     const tx = new Transaction(txObject, {chain: 'ropsten'})
     tx.sign(Buffer.from(PrivateKey,'hex'))
     const serializeTx = tx.serialize()
     const rawTx = '0x' + serializeTx.toString('hex')

     //------------------broadcast the transaction 

    return await this.web3.eth.sendSignedTransaction(rawTx)

    }


    public interact(contractAddress:string,contractAbi:any) {

      
      return new this.web3.eth.Contract(contractAbi,contractAddress);



    }


    
   

  }

