const sablier_ABI = [{"constant":true,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"getEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextStreamId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"getCompoundingStream","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"},{"internalType":"uint256","name":"remainingBalance","type":"uint256"},{"internalType":"uint256","name":"ratePerSecond","type":"uint256"},{"internalType":"uint256","name":"exchangeRateInitial","type":"uint256"},{"internalType":"uint256","name":"senderSharePercentage","type":"uint256"},{"internalType":"uint256","name":"recipientSharePercentage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"cancelStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"},{"internalType":"uint256","name":"senderSharePercentage","type":"uint256"},{"internalType":"uint256","name":"recipientSharePercentage","type":"uint256"}],"name":"createCompoundingStream","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"getStream","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"},{"internalType":"uint256","name":"remainingBalance","type":"uint256"},{"internalType":"uint256","name":"ratePerSecond","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"interestOf","outputs":[{"internalType":"uint256","name":"senderInterest","type":"uint256"},{"internalType":"uint256","name":"recipientInterest","type":"uint256"},{"internalType":"uint256","name":"sablierInterest","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"feePercentage","type":"uint256"}],"name":"updateFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"isCompoundingStream","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"deltaOf","outputs":[{"internalType":"uint256","name":"delta","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"takeEarnings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"createStream","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cTokenManager","outputs":[{"internalType":"contract ICTokenManager","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"mantissa","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cTokenManagerAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"exchangeRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"senderSharePercentage","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recipientSharePercentage","type":"uint256"}],"name":"CreateCompoundingStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"senderInterest","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recipientInterest","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sablierInterest","type":"uint256"}],"name":"PayInterest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TakeEarnings","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"UpdateFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"deposit","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stopTime","type":"uint256"}],"name":"CreateStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"senderBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"recipientBalance","type":"uint256"}],"name":"CancelStream","type":"event"}]
const sablier_address = '0xc04Ad234E01327b24a831e3718DBFcbE245904CC' //Ropsten
const sablier = new web3.eth.Contract(sablier_ABI, sablier_address);

const wait = seconds => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const prompt = require('prompt-sync')();
const streamId = prompt('What is your stream ID?: ');

/** Withdrawing money from the stream.
  *
  * Script will be called by the .env 2nd account ("recipient")
  * command: truffle exec scripts/2_withdraw.js --network ropsten
  */
module.exports = async function(callback) {
  try {
    let maxWithdraw

    //variables
    const accounts = await web3.eth.getAccounts()
    const recipient = accounts[1]
    const now = Math.round(new Date().getTime() / 1000);

    /** Getting stream data
      *
      * Logging relevant info. about stream with provided ID.
      */
    const result = await sablier.methods.getStream(streamId).call()
    //check if stream hasn't finished
    if(now<result.stopTime){
      //log basic info
      console.log(`\nYou're receiving ${result.deposit} Wei from ${result.sender} with the speed of ${result.ratePerSecond} Wei/s.\n`)
      await wait(2)

      //check if stream has started
      if(now>=result.startTime){
        maxWithdraw = (result.remainingBalance-(result.stopTime-now))*result.ratePerSecond
        console.log(`Stream has started ${now-result.startTime} seconds ago.`)
        await wait(1)
        console.log(`You've already witdrawn ${result.deposit-result.remainingBalance} from ${result.deposit} Wei.`)
        await wait(1)
        console.log(`Currently you're able to withdraw ${maxWithdraw} Wei.\n`)
        await wait(1)
      } else { //log when stream hasn't started
        console.log(`Stream will start in ${result.startTime-now} seconds.`)
        await wait(1)
        console.log(`Stream will end in ${result.stopTime-now} seconds.`)
      }
    } else { //log when stream has finished
      maxWithdraw = result.remainingBalance
      await wait(1)
      console.log(`Stream has finished ${now-result.stopTime} seconds ago.`)
      await wait(1)
      console.log(`\nYour balance to withdraw is ${maxWithdraw} Wei.\n`)
    }

    //Ask when user have available funds to withdraw
    if(now>result.startTime){
      const answer = prompt('Would you like to withdraw your funds? (y): ')

      if(answer==='y'){
        console.log(`Withrawing ${maxWithdraw} Wei...`)
        await sablier.methods.withdrawFromStream(streamId, maxWithdraw.toString())
        .send({from: recipient, gas: 5000000, gasPrice: 5000000000})
        .on('receipt', async function(receipt) {
          console.log(`\nYou've successfully withdrawn ${maxWithdraw} Wei.`)
          await wait(1)
          console.log(`Your remaining balance is ${result.remainingBalance-maxWithdraw}.`)
        })
      }
    }

    console.log('\nClosing the script...')
    /** !H0m3W0rk #1
      *
      * Write code for the following action:
      * "Do you want convert weth to eth? y/n"
      */
  }
  catch(error) {
    console.log(error)
  }

  callback()
}