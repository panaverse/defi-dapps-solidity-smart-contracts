//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract ValueStorage  {

    uint public value = 2;

    function update() public virtual {
        value += 1;
    }
}

contract ValueStorage1 is ValueStorage  {
    function update() public virtual override {
        value += 4;
    }
}

contract ValueStorage2 is ValueStorage  {

    function update() public virtual override {
        value += 8;
        //super.update();
        //ValueStorage.update();
    }
}

contract ValueStorage3 is ValueStorage2,ValueStorage1 {
    
    function update() public override(ValueStorage2,ValueStorage1) {
        value += 10;
        super.update();
        //ValueStorage1.update();
    }
}


