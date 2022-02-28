//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Calculator {
    function getResult() external pure returns (uint256);
    function getData() external pure returns (uint256);
}

contract ContractD is Calculator {
    function getResult() external pure override returns (uint256) {
        return 56;
    }

    function getData() external pure override returns (uint256) {
        return 12;
    }
}

contract ContractF is Calculator {
    function getResult() external pure override returns (uint256) {
        return 78;
    }

    function getData() external pure override returns (uint256) {
        return 32;
    }
}

abstract contract ContractA {

    function getData() public pure returns (uint256) {
        return 45;
    }
    function getResult() public pure virtual returns (uint256);
}

contract ContractB is ContractA{
    function getResult() public pure override returns (uint256) {
        return 12;
    }
}

contract C {

    function checkInterface() public returns (uint256){ 
        Calculator d = new ContractD();
        d.getResult();
    }

    function checkFunctionA() public returns (uint256){
        //ContractA a = new ContractA();
        ContractB b = new ContractB();
        //b.compute(5,6);
        //b.increment(5);
        //a.getResult();
        //return a.getData();
    }
}
