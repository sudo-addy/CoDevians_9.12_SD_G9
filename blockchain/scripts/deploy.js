async function main() {
  console.log('🚀 Deploying Bond Smart Contracts...\n');

  // Deploy BondToken
  const BondToken = await ethers.getContractFactory('BondToken');
  const bondToken = await BondToken.deploy(
    'NHAI Bond 2026',
    'NHAI-2026',
    10000, // 10,000 units
    Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year maturity
    750, // 7.5% coupon rate
    'National Highway Authority Infrastructure Bond',
    '0x0000000000000000000000000000000000000000' // issuer address
  );
  await bondToken.deployed();
  console.log('✓ BondToken deployed to:', bondToken.address);

  // Deploy BondMarketplace
  const BondMarketplace = await ethers.getContractFactory('BondMarketplace');
  const marketplace = await BondMarketplace.deploy();
  await marketplace.deployed();
  console.log('✓ BondMarketplace deployed to:', marketplace.address);

  console.log('\n✨ Deployment complete!');
  console.log('BondToken Address:', bondToken.address);
  console.log('Marketplace Address:', marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
