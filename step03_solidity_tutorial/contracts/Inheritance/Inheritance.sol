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

   //Virtual Override
   // if we declare same signature(name, access modifier , return ) of function in both contract so we need to make function of parent contract virtual and make the child function override

   function getData() public pure virtual returns(uint) { return 45; }
   function compute(uint a, uint b) internal pure returns (uint) { return a + b; }
   
    }


//Derived Contract
contract B is A {
   uint private result;
    
   function getComputedResult() public {      
      result = compute(3, 5); 
   }
   function getResult() public view returns(uint) { return result; }
    //function getData() public pure returns(uint) { return 45; }// now this will give error but in contract D will try to use virtual and override for that first we need to make getData of contract A virtual
    //for that first we need to make getData of contract A virtual
   function getData() public pure override returns(uint) { return 50; }

}


contract C {
    B b;
    A a;
    

    constructor() {
        b = new B();
        a = new B();
    }


    function checkfunctionA() public view returns(uint256) {
        /*
        //b.compute(5,6);           //we can't access internal function outside the contract and child contract
        //b.increment(4);           // its private we can't acees this function
        b.getResult();              // it's working we can call public funtion but not private and internal
        
        return b.getData();
        */
        /*
        //now if we try to call the getresult function it will give error because now the type of variable a is A so contract A don't have getResult()function 

        // a.getResult();
        return a.getData();            //getData is the function of contract A
        */
        return a.getData();
    }
    function checkfunctionB() public view returns(uint256) {
       
        return b.getData(); //getData is the function of contract A
    }
}


contract ValueStorage  {
    uint public value = 2;
    function update() virtual  public {
        value += 1;
        }
    
}
contract ValueStorage1 is ValueStorage {
    function update() public virtual override {
        value *= 2;
        ValueStorage.update();
    }
}
contract ValueStorage2 is ValueStorage {
    function update() public virtual override {
        value += 10;
        ValueStorage.update();
        // supper.update() this and above are the same
    }
}
// multiple inheritence for the same herarci 
contract ValueStorage3 is ValueStorage2 , ValueStorage1{ //right side will be used in super.update here the valueStorage1 will be call
     
    function update() public override(ValueStorage2,ValueStorage1) { 
        value *= 8;     
        super.update();
        
    }
}

