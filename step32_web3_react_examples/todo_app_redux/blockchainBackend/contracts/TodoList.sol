pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  event TaskDeleted(
    uint id
  );

  constructor() public {
  }

  function createTask(uint _id, string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(_id, _content, false);
    emit TaskCreated(_id, _content, false);
  }

  function toggleCompleted(uint _id) public {

    uint indexToBeUpdated;
    
    for (uint i=1; i<=taskCount; i++) {
      if (tasks[i].id == _id) {
        indexToBeUpdated = i;
        break;
      }
    }

    Task memory _task = tasks[indexToBeUpdated];
    _task.completed = true;
    tasks[indexToBeUpdated] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

  function deleteTask(uint _id) public {
    uint indexToBeDeleted;
    // if index to be deleted is not the last index, swap position.
    for (uint i=0; i<taskCount; i++) {
      if (tasks[i].id == _id) {
        indexToBeDeleted = i;
        break;
      }
    }

      if (indexToBeDeleted < taskCount) {
        tasks[indexToBeDeleted] = tasks[taskCount];
      }
    
    // we can now reduce the array length by 1
    taskCount--;
    emit TaskDeleted(_id);
  }
}
