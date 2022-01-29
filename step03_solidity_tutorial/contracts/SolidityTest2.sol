//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SolidityTest2 {

    enum FundingRounds {
      SEED,
      PRIVATE,
      PUBLIC
    }

    struct FundingRoundDetails {
        uint256 fundingRequired;
        FundingRounds round;
    }

    FundingRoundDetails[] public allRounds;

    mapping(uint256 => FundingRoundDetails) fundingRounds; 

    mapping(address => FundingRoundDetails) userRounds;

    mapping(address => mapping(uint256=>bool)) someMapping;

    uint256 roundCounter;

    struct UserInfo {
        string name;
        uint256 age;
        mapping(address=>uint256) fundingReceived;
    }

    mapping(address=>UserInfo) users;

    function addUser(string memory _name, uint256 _age) public {
        //UserInfo memory _user = UserInfo("Zia Khan", 30);

        UserInfo storage _user = users[msg.sender];
        _user.name= _name;
        _user.age = _age;
    }

    function provideFunding(address _user, uint256 _amount) public {
        UserInfo storage _userInfo = users[_user];
        _userInfo.fundingReceived[msg.sender] = _amount;
    }

    function addFundingRounds() public {
        FundingRoundDetails memory details1 = FundingRoundDetails(10000, FundingRounds.SEED);
        FundingRoundDetails memory details2 = FundingRoundDetails(20000, FundingRounds.PRIVATE);
        FundingRoundDetails memory details3 = FundingRoundDetails(30000, FundingRounds.PUBLIC);
        allRounds.push(details1);
        allRounds.push(details2);
        allRounds.push(details3);


        fundingRounds[++roundCounter] = details1;
        fundingRounds[++roundCounter] = details2;
        fundingRounds[++roundCounter] = details3;
    }

    function addRound(uint256 amount, uint256 round) public {
        roundCounter++;
        fundingRounds[roundCounter] = FundingRoundDetails(amount, FundingRounds(round));

        userRounds[msg.sender] = FundingRoundDetails(amount, FundingRounds(round));

    }

    function getMyRoundInfo() public view returns(FundingRoundDetails memory) {
        return userRounds[msg.sender];
    }

    function getRequiredFundingForRound(uint256 _roundNumber) public view returns(uint256){
        return allRounds[_roundNumber].fundingRequired;
    }
}