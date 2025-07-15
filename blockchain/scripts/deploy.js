import hardhat from 'hardhat';
const { ethers } = hardhat;

async function main() {
  const URLRegistry = await ethers.getContractFactory('URLRegistry');
  const urlRegistry = await URLRegistry.deploy();
  await urlRegistry.deployed();
  console.log('URLRegistry deployed to:', urlRegistry.address);
  console.log('Network:', (await urlRegistry.provider.getNetwork()).name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 