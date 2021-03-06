import { ethers, upgrades } from "hardhat";

async function main() {
  const BSCLAUNCHPAD = await ethers.getContractFactory("BSCLAUNCHPAD");
  const bsc = await upgrades.deployProxy(BSCLAUNCHPAD, ["100000000000000000"]);
  await bsc.deployed();
  console.log(`The Contract is Deployed on ${bsc.address}`);
}

main();
