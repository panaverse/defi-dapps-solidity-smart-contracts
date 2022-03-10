//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Ownable {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }
}


contract ValueStorage is Ownable {
    uint public value = 2;

    function update() public virtual onlyOwner {
        value += 1;
    }

    //...
}


contract ValueStorage1 is ValueStorage {

    function update() public override virtual {
        value *= 2;
        super.update();
    }
}


contract ValueStorage2 is ValueStorage {

    function update() public override virtual {
        value *= 3;
        super.update();
    }
}


contract InheritanceExample2 is ValueStorage1, ValueStorage2 {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function update() public override(ValueStorage1, ValueStorage2) {
        value *= 3;
        super.update();
    }
}
