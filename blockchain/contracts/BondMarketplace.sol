// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BondMarketplace
 * @dev Marketplace for trading tokenized bonds
 */
contract BondMarketplace is Ownable {
    struct BondListing {
        address seller;
        IERC20 bondToken;
        uint256 quantity;
        uint256 pricePerUnit;
        bool active;
    }

    mapping(uint256 => BondListing) public listings;
    uint256 public listingCount;
    uint256 public platformFeePercentage = 25; // 0.25% = 25 basis points

    event BondListed(uint256 indexed listingId, address indexed seller, uint256 quantity, uint256 pricePerUnit);
    event BondPurchased(uint256 indexed listingId, address indexed buyer, uint256 quantity);
    event ListingCancelled(uint256 indexed listingId);

    function listBond(
        IERC20 bondToken,
        uint256 quantity,
        uint256 pricePerUnit
    ) public {
        require(quantity > 0, "Quantity must be > 0");
        require(pricePerUnit > 0, "Price must be > 0");

        listings[listingCount] = BondListing({
            seller: msg.sender,
            bondToken: bondToken,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            active: true
        });

        emit BondListed(listingCount, msg.sender, quantity, pricePerUnit);
        listingCount++;
    }

    function buyBond(uint256 listingId, uint256 quantity) public payable {
        BondListing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(quantity <= listing.quantity, "Insufficient quantity");

        uint256 totalPrice = quantity * listing.pricePerUnit;
        uint256 platformFee = (totalPrice * platformFeePercentage) / 10000;
        uint256 sellerAmount = totalPrice - platformFee;

        require(msg.value >= totalPrice, "Insufficient payment");

        // Transfer bonds to buyer
        listing.bondToken.transferFrom(listing.seller, msg.sender, quantity);

        // Transfer payment to seller
        payable(listing.seller).transfer(sellerAmount);

        // Update listing
        listing.quantity -= quantity;
        if (listing.quantity == 0) {
            listing.active = false;
        }

        emit BondPurchased(listingId, msg.sender, quantity);
    }

    function cancelListing(uint256 listingId) public {
        BondListing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Only seller can cancel");
        require(listing.active, "Listing already inactive");

        listing.active = false;
        emit ListingCancelled(listingId);
    }

    function withdrawFees() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}
