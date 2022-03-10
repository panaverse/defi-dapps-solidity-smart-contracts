//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract SuperContract {
    uint internal data;

    function externalFn() external returns (uint) { data = 99; return data; }
    function publicFn() public returns (uint) { data = 100; return data; }
    function setData(uint _a) internal { data = _a; }
    function multiply(uint _a) private pure returns (uint) { return _a * 2; }
}


contract VisibilityExample is SuperContract {
    function readData() public {
        //Following calls: error: not accessible
        //uint result = multiply(2);
        //externalFn();

        //Following calls: Allowed access
        data = data * 5; //variable accessible
        setData(10); //function accessible
        this.externalFn();
        publicFn();
    }
}


//Contract accessing VisibilityExample contract
contract ExternalContract {
    VisibilityExample public ve = new VisibilityExample();

    function accessOtherContract() public {
        //Following calls: error: not accessible
        //ve.setData(10);
        //ve.multiply(10);

        //Following calls: Allowed access
        ve.externalFn();
        ve.publicFn();
        ve.readData();
    }
}
