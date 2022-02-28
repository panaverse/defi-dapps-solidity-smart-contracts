//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract A {
   //private state variable
   uint private data;
   
   //public state variable
   uint public info;

   //constructor
   constructor() {
      info = 10;
   }
   //private function
   function increment(uint a) private pure returns(uint) { return a + 1; }
   
   //public function
   function updateData(uint a) public { data = a; }
   function getData() public pure virtual returns(uint) { return 45; }
   function compute(uint a, uint b) internal pure returns (uint) { return a + b; }
}

contract B is A {
    uint private result;
    
    constructor(uint256 _result) {
        result = _result;
    }
    function getComputedResult() public { 
        //increment(45);
        getData();
        uint256 a = this.info();
        result = compute(3, 5); 
    }
    function getResult() public view returns(uint) { return result; }
    function getData() public pure override returns(uint) { return 5; }
}

contract C {

    B b;
    A a;

    constructor() {
        b = new B(9);
        a = new B(12);
    }

    function checkFunctionA() public view returns (uint256){
        //B b = new B();
        //b.compute(5,6);
        //b.increment(5);
        //a.getResult();
        return a.getData();
    }

    function checkFunctionB() public view returns (uint256){
        return b.getData();
    }
}
