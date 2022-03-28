import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { ERC20 } from "../../types/ERC20";
//import { ERC__factory } from "../../types/ERC20__factory";

task("deploy:ERC20")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const erc20Factory = await ethers.getContractFactory("ERC20");
    const erc20: ERC20= <ERC20>await erc20Factory.deploy(taskArguments.greeting);
    await erc20.deployed();
    console.log("ERC deployed to: ", erc20.address);
  });
