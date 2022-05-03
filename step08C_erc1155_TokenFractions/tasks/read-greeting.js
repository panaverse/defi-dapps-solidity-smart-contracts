
task("read-greeting")
  .addParam("contract","Contract Address")
  .setAction(async taskArgs=>{
    const contractAddress = taskArgs.contract;
    const Greeter = await ethers.getContractFactory("Greeter");

    const greeter = await Greeter.attach(contractAddress);
    const message = await greeter.greet();

    console.log("Greet message = ",message);
});

//module.exports = {}