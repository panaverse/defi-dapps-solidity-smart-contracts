pragma solidity ^0.5.0;

contract Asset {
  string public name;
  address public custodian;
  STATUSES public status;

  enum STATUSES {
    CREATED,
    SENT,
    RECEIVED
  }

  event Action(
    string name,
    address account,
    address custodian,
    uint timestamp
  );

  constructor(string memory _name) public {
    // Set name
    name = _name;

    // Make deployer custodian
    custodian = msg.sender;

    // Update status to "CREATED"
    status = STATUSES.CREATED;

    // Log history
    emit Action("CREATE", msg.sender, msg.sender, now);
  }

  function send(address _to) public {
    // Must be custodian to send
    require(msg.sender == custodian);

    // Cannot send to self
    require(_to != custodian);

    // Can't be in "SENT" status
    // Must be "CREATED" or "RECEIVED"
    require(status != STATUSES.SENT);

    // Update status to "SENT"
    status = STATUSES.SENT;

    // Make _to new custodian
    custodian = _to;

    // Log history
    emit Action("SEND", msg.sender, _to, now);
  }

  function receive() public {
    // Must be custodian to receive
    require(msg.sender == custodian);

    // Must be in "SENT" status
    // Cannot be "CREATED" or "RECEIVED"
    require(status == STATUSES.SENT);

    // Update status to "RECEIVED"
    status = STATUSES.RECEIVED;

    // Log history
    emit Action("RECEIVE", msg.sender, msg.sender, now);
  }
}
