const { expectRevert } = require('@openzeppelin/test-helpers');
const RaffleLottery  = artifacts.require('./RaffleLottery')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
//const web3 = new Web3(ganache.provider({ ... }));
//web3.currentProvider.setMaxListeners(300); // or more :)

console.log(`Running Tests!!!!!!!!!!!!`)

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('RaffleLottery', ([deployer, user1, user2, user3]) => {

  let raffleLottery
  let _feePercent = 10
  let _ticketPrice = (0.001 *10 **18).toString()
  let _totalTickets = 10
  let _VRF
  let _linkToken
  let _keyHash
  let _feeLink
  let result
  let zeroAddress = '0x0000000000000000000000000000000000000000'
  let linkDeposit = (100*10**18).toString() // when testing on Kovan may want to change this based on amount you put into contract address from Faucet
  const unlockedAccount = '0xbe6977e08d4479c0a6777539ae0e8fa27be4e9d6' // account with LINK and ETH 
  let linkRef

  beforeEach(async () => {

    let miniABI = [
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      } 
    ]
    
    const network =  process.env.NETWORK
    // consider using switch and object with network values for more networks to deploy to 
    if(network === 'kovan') {
      _VRF = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'
      _linkToken = '0xa36085F69e2889c224210F603D836748e7dC0088'
      _keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
      _feeLink = (0.1 * 10 ** 18).toString()
      linkRef  = new web3.eth.Contract(miniABI,_linkToken)
    } else { // fork of mainnet or using mainnet itself
      _VRF = '0xf0d54349aDdcf704F77AE15b96510dEA15cb7952'
      _linkToken = '0x514910771AF9Ca656af840dff83E8264EcF986CA'
      _keyHash = '0xaa77729d3466ca35ae8d28b3bbac7cc36a5031efdc430821c02bc31a238af445'
      _feeLink = (2 * 10 ** 18).toString()
      linkRef = new web3.eth.Contract(miniABI,_linkToken)
    }

    // deploy with parameters for that network
    raffleLottery  = await RaffleLottery.new(
      _feePercent,
      _ticketPrice,
      _totalTickets,
      _VRF,
      _linkToken,
      _keyHash,
      _feeLink
    )
    // Transfer some LINK (e.g 100 LINK to contract)
    await linkRef.methods.transfer(raffleLottery.address, linkDeposit).send({from: unlockedAccount})
  })

  describe('Link in contract and withdrawLink()', () => {

    let balanceLink

    it('starts with a correct LINK balance', async () => {
      balanceLink = await linkRef.methods.balanceOf(raffleLottery.address).call()
      balanceLink.toString().should.equal(linkDeposit.toString())
    })

    it('rejects account other than feeAccount withdrawing LINK', async () => {
      expectRevert(raffleLottery.withdrawLink({from: user1}), 'Only Deployer/FeeAccount Can Withdraw LINK')
    })
    
    it('allows feeAccount/deployer to withdraw link balance, reducing balance to zero', async () => {
      await raffleLottery.withdrawLink({from: deployer})
      balanceLink = await linkRef.methods.balanceOf(raffleLottery.address).call()
      balanceLink.toString().should.equal('0')
    })

  })

  describe('deployment', () => {

    it('tracks the feePercent', async () => {
      result =  await raffleLottery.feePercent();
      result.toString().should.equal(_feePercent.toString()); 
    })

    it('tracks the feeAccount', async () => {
      result = await raffleLottery.feeAccount()
      result.should.equal(deployer)
    })

    it('tracks the ticketPrice', async () => {
      const result = await raffleLottery.ticketPrice()
      result.toString().should.equal(_ticketPrice)
    })

    it('tracks the correct starting ticketNumber', async () => {
      const result = await raffleLottery.ticketNumber()
      result.toString().should.equal('0')
    })

    it('tracks the maximum number of tickets in each raffle', async () => {
      const result = await raffleLottery.totalTickets()
      result.toString().should.equal(_totalTickets.toString())
    })

    it('tracks the correct VRF address', async () => {
      const result = await raffleLottery.vrf()
      result.should.equal(_VRF)
    })

    it('tracks the correct LINK Token address', async () => {
      const result = await raffleLottery.linkToken()
      result.should.equal(_linkToken)
    })

    it('tracks the correct keyHash ', async () => {
      const result = await raffleLottery.keyHash()
      result.toString().should.equal(_keyHash.toString())
    })

    it('tracks the correct fee for using VRF ', async () => {
      const result = await raffleLottery.feeLink()
      result.toString().should.equal(_feeLink.toString())
    })

    it('starts without a latest winner', async () => {
      const result = await raffleLottery.latestWinner()
      result.toString().should.equal(zeroAddress)
    })

    it('starts without feesEarned user1', async () => {
      const result = await raffleLottery.feesEarned(user1)
      result.toString().should.equal('0')
    })

    it('starts without feesEarned user2', async () => {
      const result = await raffleLottery.feesEarned(user2)
      result.toString().should.equal('0')
    })

    it('starts with corect raffleId', async () => {
      const result = await raffleLottery.raffleId()
      result.toString().should.equal('0')
    })

    it('starts as open after deployment', async () => {
      const result = await raffleLottery.isOpen()
      result.should.equal(true)
    })

    it('starts without a winning ticket', async () => {
      const result = await raffleLottery.winningTicket()
      result.toString().should.equal('0')
    })

    it('starts with canRaffle is true', async () => {
      const result = await raffleLottery.canRaffle()
      result.should.equal(true)
    })

    it('starts with user1 has no totalWinnings', async () => {
      const result = await raffleLottery.totalWinnings(user1)
      result.toString().should.equal('0')
    })

    it('starts with user2 has no totalWinnings', async () => {
      const result = await raffleLottery.totalWinnings(user2)
      result.toString().should.equal('0')
    })

    it('starts with no winners in raffle', async () => {
      const raffleId = await raffleLottery.raffleId()
      const result = await raffleLottery.winners(raffleId)
      result.should.equal(zeroAddress)
    })

  })

  describe('entering raffle enterRaffle()', () => {

    let numTicketsUser1 = 2;
    let numTicketsUser2 = 6;
    let overpaidTicket = (0.02*10**18).toString()
    let resultUser1
    let resultUser2
    let raffleId
    let ticketNumber
    let ticketsLeft

    beforeEach(async () => {
      ticketNumber = await raffleLottery.ticketNumber();
      resultUser1 = await raffleLottery.enterRaffle(numTicketsUser1, {from: user1, value: overpaidTicket})
      resultUser2 = await raffleLottery.enterRaffle(numTicketsUser2, {from: user2, value: _ticketPrice})
      raffleId = await raffleLottery.raffleId()
      ticketsLeft = _totalTickets - (Number(ticketNumber.toString()))
    })
  
    it('sucessfully enters user1', async () => {
      result = await raffleLottery.ticketOwners(Number(ticketNumber.toString()) + (numTicketsUser1-1))
      result.should.equal(user1)
    })

    it('sucessfully enters user2', async () => {
      result = await raffleLottery.ticketOwners(Number(ticketNumber.toString()) + (numTicketsUser1-1) + (numTicketsUser2-1))
      result.should.equal(user2)
    })

    it('emits an Enter Event associated with user1', async () => {
      const log = resultUser1.logs[0]
      log.event.should.eq('Entered')
      const event = log.args
      event._entrant.should.equal(user1, 'captured correct entrant')
      event._raffleId.toString().should.equal(raffleId.toString(), 'has correct raffleId')
      event._numberTickets.toString().should.equal(numTicketsUser1.toString(), 'has correct numberTickets bought')
      event._hasChange.should.equal(true, 'has change')
    })

    it('emits an Enter Event associated with user2', async () => {
      const log = resultUser2.logs[0]
      log.event.should.eq('Entered')
      const event = log.args
      event._entrant.should.equal(user2, 'captured correct entrant')
      event._raffleId.toString().should.equal(raffleId.toString(), 'has correct raffleId')
      event._numberTickets.toString().should.equal(numTicketsUser2.toString(), 'has correct numberTickets bought')
      event._hasChange.should.equal(false, 'has change')
    })
    
    it('updates numberTickets bought by entrant user1', async () => {
      resultUser1 = await raffleLottery.numberTickets(raffleId, user1)
      resultUser1.toString().should.equal(numTicketsUser1.toString())
    })

    it('updates numberTickets bought by entrant user2', async () => {
      resultUser2 = await raffleLottery.numberTickets(raffleId, user2)
      resultUser2.toString().should.equal(numTicketsUser2.toString())
    })

    it('keeps raffle open when not all tickets bought', async () => {
      result = await raffleLottery.isOpen()
      result.should.equal(true)
    })

    describe('user entering again when tickets still available', () => {

      beforeEach(async () => {
        const ticketsSold = await raffleLottery.ticketNumber()
        ticketsLeft = _totalTickets - Number(ticketsSold.toString())
        resultUser1 = await raffleLottery.enterRaffle(ticketsLeft, {from: user1, value: _ticketPrice})
      })

      it('emits an Enter Event associated with user1', async () => {
        const log = resultUser1.logs[0]
        log.event.should.eq('Entered')
        const event = log.args
        event._entrant.should.equal(user1, 'captured correct entrant')
        event._raffleId.toString().should.equal(raffleId.toString(), 'has correct raffleId')
        event._numberTickets.toString().should.equal(ticketsLeft.toString(), 'has correct numberTickets bought')
        event._hasChange.should.equal(false, 'has change')
      })

      it('updates numberTickets bought by entrant user1', async () => {
        resultUser1 = await raffleLottery.numberTickets(raffleId, user1)
        const totalTickets = numTicketsUser1 + Number(ticketsLeft.toString())
        resultUser1.toString().should.equal(totalTickets.toString(), 'updates total tickets bought')
      })

      it('updates raffle as closed if all tickets bought', async () => {
        result = await raffleLottery.isOpen()
        result.should.equal(false)
      })

    })

  })

  describe('failure', () => {

    let zeroTickets = 0
    let overTickets = _totalTickets + 1;
    let insufficientAmount = (0.0005*10**18).toString()
    let ticketsLeft 
    let ticketNumber
    let numTicketsUser1 = 2;

    // just a rough guide of tests (better architecture to tests below required)
    //remove LINK for fee and check any further entries fail
    it('rejects buying tickets when insufficient amount of LINK', async () => {
      result = await raffleLottery.withdrawLink({from: deployer})
      expectRevert(raffleLottery.enterRaffle('1', {from: user2, value: _ticketPrice}),'Raffle not available')
      //await linkRef.methods.transfer(raffleLottery.address, linkDeposit).send({from: unlockedAccount}) //restore LINK
    })

    it('rejects buying number tickets above maximum', async () => {
      expectRevert(raffleLottery.enterRaffle(overTickets, {from: user1, value: _ticketPrice}), 'Invalid Number of Tickets')
    })

    it('rejects buying more tickets than what is left', async () => {
      await raffleLottery.enterRaffle(numTicketsUser1, {from: user1, value: _ticketPrice})
      ticketNumber = await raffleLottery.ticketNumber()
      ticketsLeft = _totalTickets - Number(ticketNumber.toString())
      expectRevert(raffleLottery.enterRaffle(ticketsLeft + 1, {from: user2, value: _ticketPrice}),'Invalid Number of Tickets')
    })

    it('rejects buying zero tickets', async () => {
      expectRevert(raffleLottery.enterRaffle(zeroTickets, {from: user1, value: _ticketPrice}), 'Invalid Number of Tickets')
    })

    it('rejects insufficient amount', async () => {
      expectRevert(raffleLottery.enterRaffle(numTicketsUser1, {from: user1, value: insufficientAmount}), 'Not enough to buy ticket')
    })

  })

  describe('completeRaffle()', () => {

    let status
    let raffleId
    let winner
    let _winnings
    let _feeAmount
    let _availableAmount
    let balanceETHCaller
    let balanceETHFeeAccount
    let newBalanceWithFees
    let newBalanceApprox
    let expectedBalanceApprox
    let caller
    let id
    let isOpen

    describe('success', () => {

      beforeEach(async () => {    
        caller = user1
        id = await raffleLottery.raffleId()
        // users 1 and 2 enter raffle buying all tickets 
        await raffleLottery.enterRaffle(5, {from: user1, value: _ticketPrice})
        await raffleLottery.enterRaffle(5, {from: user2, value: _ticketPrice})
        // amount in contract from ticket Fees
        _availableAmount = await web3.eth.getBalance(raffleLottery.address)
        _availableAmount = web3.utils.fromWei(_availableAmount.toString(), 'ether')
        _availableAmount = Number(_availableAmount.toString())
        // amount to be paid out as fewws
        _feeAmount = (_availableAmount * _feePercent)/ 100
        // amount to pay out to winner
        _winnings = _availableAmount - _feeAmount;
        // starting balance of individiual to completeRaffler
        balanceETHCaller = await web3.eth.getBalance(caller)
        balanceETHCaller = Number(web3.utils.fromWei(balanceETHCaller.toString(), 'ether'))
        // starting balance FEE Account/Deployer
        balanceETHFeeAccount = await web3.eth.getBalance(deployer)
        balanceETHFeeAccount = Number(web3.utils.fromWei(balanceETHFeeAccount.toString(), 'ether'))
        //complete raffle.
        status = await raffleLottery.completeRaffle({from: caller})
        raffleId = await raffleLottery.raffleId()
        winner = await raffleLottery.latestWinner()
        
      })

      it('updates raffleId', async () => {
        let nextRaffledId = await raffleLottery.raffleId()
        Number(nextRaffledId.toString()).should.equal(Number(id.toString()) + 1)
      })

      it('it resets ticketNumber', async () => {
        const ticketNumber = await raffleLottery.ticketNumber()
        ticketNumber.toString().should.equal('0')
      })

      it('it updates latestWinner', async () => {
        let winnerInMapping = await raffleLottery.winners(id)
        winnerInMapping.should.equal(winner)
      })

      it('it opens raffle for next round', async () => {
        isOpen = await raffleLottery.isOpen()
        isOpen.should.equal(true)
      })

      it('emits Winner event', () => {
        const log = status.logs[0]
        log.event.should.eq('Winner')
        const event = log.args
        event._winner.should.equal(winner, 'captured correct entrant')
        event._raffleId.toString().should.equal(id.toString(), 'has correct raffleId')
        event._numberTickets.toString().should.equal('5', 'has correct numberTickets bought by winner')
        const _winningsEventApprox = Number(web3.utils.fromWei(event._winnings.toString(),'ether')).toFixed(5)
        const _winningsApprox = _winnings.toFixed(5)
        _winningsEventApprox.should.equal(_winningsApprox, 'has correct winnings amount')
      })

      // approximations used for quick tests but- better tests can be created
      it('pays 50% fees to caller of completeRaffle()', async () => {
        newBalanceWithFees = await web3.eth.getBalance(caller)
        newBalanceApprox = Number(web3.utils.fromWei(newBalanceWithFees.toString(),'ether')).toFixed(1)
        expectedBalanceApprox = (balanceETHCaller + (_feeAmount/2)).toFixed(1)
        console.log(newBalanceApprox, expectedBalanceApprox)
        newBalanceApprox.should.equal(expectedBalanceApprox)
      })

      it('pays 50% fees to feeAccount', async () => {
        newBalanceWithFees = await web3.eth.getBalance(deployer)
        newBalanceApprox = Number(web3.utils.fromWei(newBalanceWithFees.toString(),'ether')).toFixed(4)
        expectedBalanceApprox = (balanceETHFeeAccount + (_feeAmount/2)).toFixed(4)
        console.log(newBalanceApprox, expectedBalanceApprox)
        newBalanceApprox.should.equal(expectedBalanceApprox)
      })

    })

    describe('failure', () => {

      it('rejects caller not a player', async () => {
        expectRevert(raffleLottery.completeRaffle({from: user3}),'Only Ticket Holders')
      })

      it('rejects when raffle is still open', async () => {
        // when not all tickets have been bought
        expectRevert(raffleLottery.completeRaffle({from: user1}),'Raffle is still open')
      })
      
    })

  })


})