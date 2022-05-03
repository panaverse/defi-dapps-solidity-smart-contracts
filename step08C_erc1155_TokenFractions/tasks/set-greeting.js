
task("set-greeting")
  .addParam("contract","Contract Address")
  .addParam("greetMessage","Specify Greet message")
  .setAction(async taskArgs=>{
      const contractAddress = taskArgs.contract;
      const greetMessage = taskArgs.greetMessage;
      const Greeter = await ethers.getContractFactory("Greeter");

      const greeter = await Greeter.attach(contractAddress);
      const txt = await greeter.setGreeting(greetMessage);

      console.log("Result = ",txt.hash);
      console.log("contractAddress = ",contractAddress);
  });

//module.exports = {}