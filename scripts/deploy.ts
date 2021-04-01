import { ContractFactory } from "@ethersproject/contracts";
import { ethers, upgrades } from "hardhat";

async function main() {
  const kwikStater: ContractFactory = await ethers.getContractFactory("KwikStater");
  const totalSupply = ethers.utils.parseUnits("1000000");

  const kwik = await upgrades.deployProxy(kwikStater, [totalSupply], {
    initializer: "initialize",
  });

  await kwik.deployed();
  console.log(`The Contract is Deployed on ${kwik.address}`);
}

main();
