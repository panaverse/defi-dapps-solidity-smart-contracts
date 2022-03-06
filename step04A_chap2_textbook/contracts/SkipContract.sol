//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


library ArrayIteratorLib {

    function iterate(function(uint) pure returns (uint) _skipFn)
        internal
        pure
        returns (uint[] memory tempArr)
    {
        tempArr = new uint[](10);
        for (uint i = 0; i < 10; i++) {
            tempArr[i] = _skipFn(i + 1);
        }
    }
}


contract SkipContract {

    //Returns Array[1,2,3,4,5,6,7,8,9,10]
    function getFirst10WithSkip1() public pure returns (uint[] memory) {
        return ArrayIteratorLib.iterate(getSkipFunction(1));
    }

    //Returns Array[2,4,6,8,10,12,14,16,18,20]
    function getFirst10WithSkip2() public pure returns (uint[] memory) {
        return ArrayIteratorLib.iterate(getSkipFunction(2));
    }

    function skip1(uint _i) internal pure returns(uint) {
        return _i * 1;
    }

    function skip2(uint _i) internal pure returns(uint) {
        return _i * 2;
    }

    function getSkipFunction(uint _fnNumber)
        internal
        pure
        returns (function(uint) pure returns(uint))
    {
        if (_fnNumber == 1) {
            return skip1;
        } else if (_fnNumber == 2) {
            return skip2;
        }
    }


}

