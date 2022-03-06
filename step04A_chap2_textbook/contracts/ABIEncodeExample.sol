//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract ABIEncodeExample {
    address public addr;
    uint public uInt; //uint = uint256
    uint8 public uInt8;
    uint16 public uInt16;

    constructor() {
        addr = 0x611B947ec990Ba4e1655BF1A37586467144A2D65;
        uInt = 20;
        uInt8 = 25;
        uInt16 = 30;
    }

    function encode() public view returns (bytes memory) {

        //Returns following concatenated
        // Prefix: 0x
        // addr  : 000000000000000000000000611b947ec990ba4e1655bf1a37586467144a2d65
        // uInt  : 0000000000000000000000000000000000000000000000000000000000000014
        // uInt8 : 0000000000000000000000000000000000000000000000000000000000000019
        // uInt16: 000000000000000000000000000000000000000000000000000000000000001e
        return abi.encode(addr, uInt, uInt8, uInt16);
    }

    function encodePacked() public view returns (bytes memory) {
        // Prefix: 0x
        // addr  : 611b947ec990ba4e1655bf1a37586467144a2d65
        // uInt  : 0000000000000000000000000000000000000000000000000000000000000014
        // uInt8 : 19
        // uInt16: 001e
        return abi.encodePacked(addr, uInt, uInt8, uInt16);
        //Packing of uint as per their size
    }

    function encodeWithSelector() public view returns (bytes memory) {
        // Prefix  : 0x
        // selector: 13bd8af1
        // uInt    : 0000000000000000000000000000000000000000000000000000000000000014
        // uInt8   : 0000000000000000000000000000000000000000000000000000000000000019
        return abi.encodeWithSelector(this.testMethod.selector, uInt, uInt8);
    }

    function encodeWithSelectorSignature() public view returns (bytes memory) {
        // Prefix  : 0x
        // selector: 13bd8af1
        // uInt    : 0000000000000000000000000000000000000000000000000000000000000014
        // uInt8   : 0000000000000000000000000000000000000000000000000000000000000019
        return abi.encodeWithSelector(bytes4(keccak256("testMethod(uint256,uint8)")), uInt, uInt8);
    }

    function encodeWithSignature() public view returns (bytes memory) {
        // Prefix  : 0x
        // selector: 13bd8af1
        // uInt    : 0000000000000000000000000000000000000000000000000000000000000014
        // uInt8   : 0000000000000000000000000000000000000000000000000000000000000019
        return abi.encodeWithSignature("testMethod(uint256,uint8)", uInt, uInt8);
    }

    function testMethod(uint _a, uint8 _b) public view {
        //...
        //Just to remove compilation warnings
        assert(_a > 0);
        assert(_b > 0);
        assert(uInt > 0);
    }
}
