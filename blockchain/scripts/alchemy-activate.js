import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/q0bkxByPgXyYVFa-fIlbk');

async function main() {
  try {
    const block = await provider.getBlock('latest');
    console.log('Alchemy Sepolia API is active. Latest block:', block.number);
  } catch (err) {
    console.error('Failed to connect to Alchemy Sepolia:', err);
  }
}

main(); 