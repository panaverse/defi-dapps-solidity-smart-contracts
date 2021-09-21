// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract LearningSolidity {
     
 // Defining structure
    struct Student {
  
        // Declaring different
        // structure elements
        string name;
        string subject;
        uint8 marks;
    }
      
    // Creating mapping
    mapping (address => Student) result;
    address[] student_result;
    Student student;
      
    //Function adding values to the mapping
    function adding_values() public {
      student
          = result[0xDEE7796E89C82C36BAdd1375076f39D69FafE252];
  
        student.name = "John";
        student.subject = "Chemistry";
        student.marks = 88;
        student_result.push(0xDEE7796E89C82C36BAdd1375076f39D69FafE252) ;
  
    }
      
     // Function to retrieve 
     // values from the mapping
     function get_student_result(
     ) view public returns (address[] memory) {
        return student_result;
    }
  
    // Function to count number 
    // of values in a mapping
    function count_students(
    ) view public returns (uint) {
        return student_result.length;
    }
}
