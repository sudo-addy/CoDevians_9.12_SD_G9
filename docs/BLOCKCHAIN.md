# Smart Contract Documentation

## Overview

The project uses two main smart contracts deployed on Polygon Mumbai testnet:

1. **BondToken.sol** - ERC20 token for infrastructure bonds
2. **BondMarketplace.sol** - Marketplace for trading bonds

## BondToken.sol

### Features
- ERC20 standard implementation
- Coupon payment functionality
- Bond maturity tracking
- Custom bond details storage

### Functions

```solidity
// Constructor
constructor(
    string name,
    string symbol,
    uint256 initialSupply,
    uint256 maturityDate,
    uint256 couponRate,  // in basis points
    string bondDetails,
    address issuer
)

// Pay coupon to token holders
function payCoupon(uint256 amount) external onlyOwner

// Mark bond as matured
function matureBond() external onlyOwner

// Get bond details
function getDetails() external view returns (...)
```

### Deployment

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

### Example Usage

```javascript
// Create new bond token
const bondToken = await BondToken.deploy(
    "NHAI Bond 2026",
    "NHAI-2026",
    10000,  // 10,000 units
    1735689600,  // Jan 1, 2025
    750,  // 7.5% coupon
    "National Highway Authority Bond",
    issuerAddress
);
```

## BondMarketplace.sol

### Features
- List bonds for sale
- Buy/sell functionality
- Platform fee collection
- Admin withdrawal

### Functions

```solidity
// List bond for sale
function listBond(
    IERC20 bondToken,
    uint256 quantity,
    uint256 pricePerUnit
)

// Buy bonds from listing
function buyBond(uint256 listingId, uint256 quantity) payable

// Cancel listing
function cancelListing(uint256 listingId)

// Withdraw platform fees
function withdrawFees() onlyOwner
```

### Gas Optimization

Platform fee: 0.25% (25 basis points)

Estimated costs on Polygon Mumbai:
- Contract deployment: ~50k gas (~₹0.50)
- Buy bond: ~100k gas (~₹1.00)
- List bond: ~80k gas (~₹0.80)

## Contract Addresses (Mumbai Testnet)

```
BondToken: 0x... (to be deployed)
Marketplace: 0x... (to be deployed)
```

## Integration with Backend

Backend connects to deployed contracts:

```javascript
// .env
CONTRACT_ADDRESS_BOND_TOKEN=0x...
CONTRACT_ADDRESS_MARKETPLACE=0x...
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
```

Backend service handles:
- Contract interactions
- Transaction monitoring
- Event parsing
- Database updates

## Testing

```bash
npx hardhat test
```

## Verification

```bash
npx hardhat verify --network mumbai CONTRACT_ADDRESS "Constructor args..."
```

## Security Considerations

✅ Uses OpenZeppelin's audited libraries  
✅ Follows ERC20 standard  
✅ Owner-based access control  
✅ No direct ETH transfers (uses safe patterns)  
✅ Event logging for all transactions  

## Future Enhancements

- Multi-sig wallet for critical operations
- Staking and governance
- Cross-chain bridges
- Advanced marketplace features
- Automatic yield distribution
