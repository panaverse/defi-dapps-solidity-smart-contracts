//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract GetterExample {
    uint public data = 25;
    uint[2] public array = [10, 20];

    /*
    //Overrides getter function of `data` state variable, if defined
    function data() public pure returns (uint) {
        return 15;
    }
    */
    /*
    //Overrides getter function of `array` state variable, if defined
    function array(uint _i) public pure returns (uint) {
        return 60 + _i;
    }
    */
}


contract ExternalContract {
    GetterExample public ge = new GetterExample();

    function getData() public view returns (uint) {
        return ge.data();
    }

    function getArray(uint _index) public view returns (uint) {
        return ge.array(_index);
    }
}