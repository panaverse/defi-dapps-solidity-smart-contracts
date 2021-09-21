// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LearningSolidity{
    
    
// note: The enums are converted to integers when you retrieve or access them
// for example in this case SMALL =0, MEDIUM =1 and LARGE = 2

   enum FreshJuiceSize{ SMALL, MEDIUM, LARGE }
   FreshJuiceSize choice = FreshJuiceSize.MEDIUM;


// set your juice size
   function setChoice(FreshJuiceSize myChoice) public {
      choice = myChoice;
   }
   
// get your juice size
   function getChoice() public view returns (FreshJuiceSize) {
      return choice;
   }
   
   
// set your juice size to default i.e MEDIUM
  function setDefaultChoice() public returns (FreshJuiceSize) {
      choice = FreshJuiceSize.MEDIUM;
      return choice;
  }
    
    
}