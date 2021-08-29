var Election = artifacts.require("./Election.sol");

contract("Election1", function(accounts) {
  var electionInstance;

  it("initializes with two candidates", function() {
    return Election.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("it initializes the candidates with the correct values", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      assert.equal(candidate1[0], 1, "contains the correct id");
      assert.equal(candidate1[1], "Zia Khan", "contains the correct name");
      assert.equal(candidate1[2], 0, "contains the correct votes count");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      assert.equal(candidate2[0], 2, "contains the correct id");
      assert.equal(candidate2[1], "Zeeshan Hanif", "contains the correct name");
      assert.equal(candidate2[2], 0, "contains the correct votes count");
    });
  });

  it("allows a voter to cast a vote", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, { from: accounts[0] });
    }).then(function(receipt) {
      return electionInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "increments the candidate's vote count");
    })
  });
});


contract("Election2", function(accounts) {
  var electionInstance;
 
  it("throws an exception for invalid candidates", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(transaction) {
      assert(transaction.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 0, "candidate 1 did not receive any votes");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
    });
  });


  it("throws an exception for double voting", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, { from: accounts[0] });
    }).then(function(receipt) {
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "increments the candidate's vote count");
      // Try to vote again
      return electionInstance.vote(1, { from: accounts[0] })
    }).then(assert.fail).catch(function(transaction) {
      assert(transaction.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    })
    .then(function(candidate1) {
        var voteCount = candidate1[2];
        assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
        return electionInstance.candidates(2);
      }).then(function(candidate2) {
        var voteCount = candidate2[2];
        assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
      });
  });

  })