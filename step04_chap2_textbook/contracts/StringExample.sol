//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract StringExample {
    event LOG(string s);

    function test() public {
        OtherContract oc = new OtherContract("TestString");
        internalCall(oc.getString());
    }

    function internalCall(string memory str) internal {
        emit LOG(str);
    }

}


contract OtherContract {
    string public str;

    constructor(string memory _str) {
        str = _str;
    }

    function getString() public view returns (string memory) {
        return str;
    }
}
