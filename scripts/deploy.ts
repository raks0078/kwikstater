import { ethers, upgrades } from "hardhat";

async function main() {
  const BSCLAUNCHPAD = await ethers.getContractFactory("BSCPAD");
  const bsc = await upgrades.deployProxy(BSCLAUNCHPAD, ["1750000000000000000000000"], {
    initializer: "initialize",
  });
  await bsc.deployed();
  console.log(`The Contract is Deployed on ${bsc.address}`);
}

main();
