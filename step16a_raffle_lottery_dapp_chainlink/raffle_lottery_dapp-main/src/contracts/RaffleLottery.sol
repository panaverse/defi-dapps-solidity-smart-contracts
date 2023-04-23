// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import './IERC20.sol';

contract RaffleLottery is VRFConsumerBase {

    // fee parameters 
    uint public feePercent;
    address payable public feeAccount; 
    
    // current raffle parameters
    uint public raffleId;
    uint public ticketNumber;
    uint public totalTickets;
    uint public ticketPrice;
    uint public winningTicket;
    bool public isOpen = true;
    bool public canRaffle = true;
    address public latestWinner;

    // Chainlink parameters and random number params for Chainlink VRF
    address public vrf; //public key against which randomness is generated
    address public linkToken;
    bytes32 public keyHash;
    uint256 public feeLink;
    uint256 public randomResult;
    bytes32 public reqId;

    // mapping of entrants number Tickets bought in current raffle
    mapping(uint => mapping(address => uint)) public numberTickets;

    // mapping of entrants total winnings all raffles entered
    mapping(address => uint) public totalWinnings;

    // mapping of entrants total fees earned
    mapping(address => uint) public feesEarned;

    // mapping winners for each raffle
    mapping(uint => address) public winners;

    // mapping ticketNumber to entrant
    mapping(uint => address) public ticketOwners;

    // events 
    event Entered(address indexed _entrant, uint256 _raffleId, uint256 _numberTickets, bool _hasChange);
    event Winner(address indexed _winner, uint256 _raffleId, uint256 _numberTickets, uint256 _winnings);
    constructor
        (
            uint _feePercent, 
            uint _ticketPrice,  
            uint _totalTickets, 
            address _VRF, 
            address _linkToken,
            bytes32 _keyHash,
            uint _feeLink
        ) 
        VRFConsumerBase(
            _VRF, // e.g 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9 VRF Coordinator on network e.g Kovan
            _linkToken // e.g 0xa36085F69e2889c224210F603D836748e7dC0088 LINK Token on  network e.g Kovan
        ) 
        public 
        {
            feePercent = _feePercent; // percent of pool as fee to contract deployer(shared with anyone who calls completeRaffle())
            feeAccount = msg.sender; // fee account set as deployer
            ticketPrice = _ticketPrice; // price in wei single raffle ticket
            totalTickets = _totalTickets; // total number of tickets for each raffle
            
            // VRF parameters
            vrf = address(_VRF);
            keyHash = _keyHash; // eg 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4  Kovan Network KeyHash
            feeLink = _feeLink; // e.g  = 0.1 ETH on Kovan
            linkToken = _linkToken; // LINK Token address on relevant network
        }

    receive() external payable {}

    /// @notice Funtion for entrant to pay ticketPrice and enter raffle
    /// @param _numTickets number of raffleTickets entrant is buying
    function enterRaffle(uint _numTickets) external payable {
      // check to see if raffle has not already completed
      require(isOpen == true, "Raffle is not available");
      // check if raffle can be held: If VRF can be called
      require(canRaffle == true, 'Raffle not available');
      // check if buying allowable number of tickets
      require(_numTickets >= 1 && _numTickets <= (totalTickets-ticketNumber), 'Invalid Number of Tickets' );
      // check if not all tickets have not been bought
      uint totalsCheck = ticketNumber + _numTickets;
      require(totalsCheck <= totalTickets, 'All tickets sold');
      // check if correct amount, if extra repay change
      require(msg.value >= ticketPrice, 'Not enough to buy ticket');
      bool _hasChange = false;
      if(msg.value > (ticketPrice*_numTickets)) {
          //msg.sender.transfer(msg.value - ticketPrice);
          (bool refund, bytes memory refundData) = msg.sender.call{value: msg.value - (ticketPrice*_numTickets)}("");
          require(refund, "Failed to send Ether");
          _hasChange = true;
      }

      // update variables
      for(uint i=1; i <= _numTickets; i++) {
          ticketOwners[ticketNumber] = msg.sender;
          ticketNumber += 1;
      }
      numberTickets[raffleId][msg.sender] += _numTickets; 
      // if all tickets bought - close raffle
      if(totalsCheck >= totalTickets) {
          isOpen = false;
      }
      // emit Entered event
      emit Entered(msg.sender,raffleId,_numTickets, _hasChange);

    }
    /// @notice If all raffle tickets bought anyone who participated in raffle can completeRaffle(earn fee) to determine winner and payout
    function completeRaffle() external {

        // only ticket holders can call function
        require(numberTickets[raffleId][msg.sender] >= 1, 'Only Ticket Holders');

        require(isOpen == false, 'Raffle is still open');
        // get winning ticket & winner & number tickets bought 
        uint _winningTicket = getWinningTicket();
        winningTicket = _winningTicket;
        address _winner = ticketOwners[winningTicket];
        winners[raffleId] = _winner;

        // pay winnings and fees 
        uint _availableAmount = address(this).balance;
        uint _feeAmount = (_availableAmount/100) * feePercent;
        uint _winnings = _availableAmount - _feeAmount;
        // send winnings to winner 
        (bool sentWinner, bytes memory dataWinner) = _winner.call{value: _winnings}("");
        require(sentWinner, "Failed to send Ether");
        // send 50% fees to feeAcount
        (bool sentFees, bytes memory dataFees) = feeAccount.call{value: _feeAmount/2}("");
        require(sentFees, "Failed to send Ether");
        // send 50% fees to caller of function as incentive
        (bool sentCaller, bytes memory dataCaller) = msg.sender.call{value: _feeAmount/2}("");
        require(sentCaller, "Failed to send Ether");
        
        // check if next round raffle can happen
        if(IERC20(linkToken).balanceOf(address(this)) >= feeLink) {
            canRaffle = true;
        } else {
            canRaffle = false;
        }
        
        isOpen = true;
   
        uint numTickets = numberTickets[raffleId][_winner];// numTickets bought by winner
        
        // emit Winner event 
        emit Winner( _winner, raffleId, numTickets, _winnings);

        // update variables 
        raffleId += 1;
        ticketNumber = 0; // reset ticketNumber
        latestWinner = _winner;
        feesEarned[msg.sender] += (_feeAmount/2);
        totalWinnings[_winner] += _winnings;
        
    }

    function getWinningTicket() internal returns(uint) {
        uint _winningTicket;
        bytes32 reqId = getRandomNumber();
        // retrieve randomNumber in state variable randomResult
        _winningTicket = (randomResult % totalTickets);
        assert(_winningTicket >= 0 && _winningTicket < totalTickets);
        return _winningTicket;
    }

    /** 
     * Requests randomness 
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(IERC20(linkToken).balanceOf(address(this)) >= feeLink, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, feeLink);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }

    function withdrawLink() external {
        require(msg.sender == feeAccount, 'Only Deployer/FeeAccount Can Withdraw LINK');
        canRaffle = false;
        IERC20(linkToken).transfer(feeAccount, IERC20(linkToken).balanceOf(address(this)));
    } 
}

