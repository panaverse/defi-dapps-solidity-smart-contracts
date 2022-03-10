//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract ChildContract {
    uint public id;
    uint public balance;

    constructor(uint _id) payable {
        id = _id;
        balance = msg.value;
    }
}


contract MainContract {
    ChildContract[] public register;

    //ChildContract will be created when MainContract is deployed
    ChildContract public childContract = new ChildContract(100);

    constructor() {
        register.push(childContract);
    }

    function createChildContract(uint _id) public returns(ChildContract) {
        ChildContract newChild = new ChildContract(_id);
        register.push(newChild);
        return newChild;
    }

    //Send ether along with the ChildContract creation
    function createChildAndPay(uint _id, uint _amount)
        public
        payable
        returns(ChildContract)
    {
        require(msg.value == _amount);
        ChildContract newChild = (new ChildContract){value: _amount}(_id);
        register.push(newChild);
        return newChild;
    }
}