//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract IfElse {
    
    function ifelse(uint _num)public pure returns(string memory) {
        string memory oneDigit = "OneDigit Number";
        string memory TwoDigit = "TwoDigit Number";
        string memory ThreeDigit = "ThreeDigit Number";
        string memory NegativeValue = "Negative Value";
        string memory GreaterNumber = "number is greater than 999";
        if (_num > 0 && _num <10) {
            return oneDigit;
        } 
        else if (_num > 10 && _num <100) {
            return TwoDigit;
        } 
        else if (_num > 100 && _num< 1000 ) {
            return ThreeDigit;
        } 
        else if (_num <0 ) {
            return NegativeValue ;
        } 
        else {
            return GreaterNumber;
            
        }
}
   

}