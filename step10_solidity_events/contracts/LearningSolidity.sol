// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LearningSolidity {
    //Declare an Event
    // event keyword is used to declare events in solidity
    // LogMyName  event will log the name passed to it
    event LogMyName(string name);

    // Defining a function for logging event
    function deposit() public payable {
        // emit keyword is used to trigger a specific event with its name in solidity
        emit LogMyName("Zia Khan");
    }
}
