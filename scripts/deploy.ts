import { ContractFactory } from "@ethersproject/contracts";
import { ethers, upgrades } from "hardhat";

async function main() {
  const kwikStaterAuction: ContractFactory = await ethers.getContractFactory("KwikAuction");

  const kwik = await kwikStaterAuction.deploy();

  await kwik.deployed();

  console.log(`The Contract is Deployed on ${kwik.address}`);
}

main();
