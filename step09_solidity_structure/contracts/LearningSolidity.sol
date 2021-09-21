// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract LearningSolidity{
    

   // Declaring a structure
   // struct keyword is used to declare a structure
   struct Book { 
      string name;
      string writter;
      uint id;
      bool available;
   }
  
   // Declaring a structure object
   Book book1;
  
   // Assigning values to the fields of the structure object book2
   Book book2 
     = Book("A smarter way to learn python", 
            "Mark Myers", 
             2, false);
  
   // Defining a function to set values for the fields of structure book1
   function set_book_detail() public {
      book1 = Book("A smarter way to learn javascript", 
                   "Mark Myers", 
                    1, true);
   }
  
  
   // Defining function to return book2 details
   function book_info(
   )public view returns (
     string memory, string memory, uint, bool) {  
            
        return(book2.name, book2.writter, 
               book2.id, book2.available);  
    } 
     
   // Defining function to return book1 details
   function get_details(
   ) public view returns (string memory, uint) {
      return (book1.name, book1.id);
   }
    
}