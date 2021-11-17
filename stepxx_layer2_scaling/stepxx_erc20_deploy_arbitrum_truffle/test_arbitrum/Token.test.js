const Token  = artifacts.require('./Token')
const Web3 = require('web3')
const web3 = new Web3()

const EVM_REVERT = 'VM Exception while processing transaction: revert'
// Helpers to format eth and token to full decimals wei and like wei
const etherFormat = (n) => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )
}
// Same as ether
const tokenFormat = (n) => etherFormat(n)

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Token', ([deployer, receiver, exchange]) => {

    const _name = "Token"
    const _symbol = "OTC"
    const _decimals = '18'
    let _totalSupply = 7000000 
    _totalSupply = web3.utils.toWei(_totalSupply.toString(), 'ether')
    let token

    beforeEach( async () => {
        token = await Token.new(_name, _symbol, _decimals, _totalSupply, {gasPrice: 0})
    })

    describe('deployment', () => {
        it('tracks the name', async () => {
        const result = await token.name()
        result.should.equal(_name)
        })

        it('tracks the symbol', async ()  => {
        const result = await token.symbol()
        result.should.equal(_symbol)
        })

        it('tracks the decimals', async ()  => {
        const result = await token.decimals()
        result.toString().should.equal(_decimals)
        })

        it('tracks the total supply', async ()  => {
        const result = await token.totalSupply()
        result.toString().should.equal(_totalSupply)
        })

        it('assigns the total supply to the deployer', async ()  => {
        const result = await token.balanceOf(deployer)
        result.toString().should.equal(_totalSupply)
        })
    })

    describe('sending tokens', () => {
        let result
        let amount
    
        describe('success', () => {
            beforeEach(async () => {
                amount = tokenFormat(100)
                result = await token.transfer(receiver, amount, { from: deployer, gasPrice: 0})
            })
        
            it('transfers token balances and updates balances', async () => {
                let balanceOf
                balanceOf = await token.balanceOf(deployer)
                balanceOf.toString().should.equal(tokenFormat(6999900).toString())
                balanceOf = await token.balanceOf(receiver)
                balanceOf.toString().should.equal(tokenFormat(100).toString())
            })
        
            it('emits a Transfer event', () => {
                // Get event logs check all correct our emitted event is ...
                // event Transfer(address indexed from, address indexed to, uint256 value);
                const log = result.logs[0]
                log.event.should.eq('Transfer')
                const event = log.args
                event.from.toString().should.equal(deployer, 'from is correct')
                event.to.should.equal(receiver, 'to is correct')
                event.value.toString().should.equal(amount.toString(), 'value is correct')
            })
        })
    
        describe('failure', () => {
            it('rejects insufficient balances', async () => {
                let invalidAmount
                invalidAmount = tokenFormat(100000000) // 100 million - greater than total supply
                token.transfer(receiver, invalidAmount, { from: deployer, gasPrice: 0}).should.be.rejected
                       
            })
        
            it('rejects invalid recipients', () => {
                token.transfer(0x0, amount, { from: deployer, gasPrice: 0 }).should.be.rejected
            })
        })
    })
    
    describe('approving tokens', () => {
        let result
        let amount
    
        beforeEach(async () => {
          amount =  tokenFormat(100)
          result = await token.approve(exchange, amount, { from: deployer, gasPrice : 0})
        })
    
        describe('success', () => {
            it('allocates an allowance for delegated token spending on exchange', async () => {
                const allowance = await token.allowance(deployer, exchange)
                allowance.toString().should.equal(amount.toString())
            })
        
            it('emits an Approval event', () => {
                // Get event logs check all correct our emitted event is ...
                // event Approval(address indexed owner, address indexed spender, uint256 value);
                const log = result.logs[0]
                log.event.should.eq('Approval')
                const event = log.args
                event.owner.toString().should.equal(deployer, 'owner is correct')
                event.spender.should.equal(exchange, 'spender is correct')
                event.value.toString().should.equal(amount.toString(), 'value is correct')
            })    
        })
    
        describe('failure', () => {
            it('rejects invalid spenders', () => {
                token.approve(0x0, amount, { from: deployer , gasPrice: 0}).should.be.rejected
            })
        })
    })
    
    describe('delegated token transfers', () => {
        let result
        let amount
    
        beforeEach(async () => {
          amount = tokenFormat(100)
          result = await token.approve(exchange, amount, { from: deployer , gasPrice: 0})
        })
    
        describe('success', () => {
            beforeEach(async () => {
                result = await token.transferFrom(deployer, receiver, amount, { gasPrice: 0 , from: exchange})
            })
        
            it('transfers token balances', async () => {
                let balanceOf
                balanceOf = await token.balanceOf(deployer)
                balanceOf.toString().should.equal(tokenFormat(6999900).toString())
                balanceOf = await token.balanceOf(receiver)
                balanceOf.toString().should.equal(tokenFormat(100).toString())
            })
        
            it('resets the allowance', async () => {
                const allowance = await token.allowance(deployer, exchange)
                allowance.toString().should.equal('0')
            })
        
            it('emits a Transfer event', () => {
                // Get event logs check all correct our emitted event is ...
                // event Transfer(address indexed from, address indexed to, uint256 value);
                const log = result.logs[0]
                log.event.should.eq('Transfer')
                const event = log.args
                event.from.toString().should.equal(deployer, 'from is correct')
                event.to.should.equal(receiver, 'to is correct')
                event.value.toString().should.equal(amount.toString(), 'value is correct')
            })
        })
    
        describe('failure', () => {
            it('rejects insufficient amounts', () => {
                // Attempt transfer too many tokens
                const invalidAmount = tokenFormat(100000000)
                token.transferFrom(deployer, receiver, invalidAmount, { from: exchange, gasPrice: 0 }).should.be.rejected
            })
        
            it('rejects invalid recipients', () => {
                token.transferFrom(deployer, 0x0, amount, { from: exchange, gasPric: 0 }).should.be.rejected
            })
        })
        
    })

})