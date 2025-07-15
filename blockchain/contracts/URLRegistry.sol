// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract URLRegistry {
    // Maps short code to owner address
    mapping(string => address) public urlOwners;
    // Maps owner address to array of their short codes
    mapping(address => string[]) public userUrls;
    // Maps short code to creation timestamp
    mapping(string => uint256) public urlCreatedAt;
    // Maps short code to click count (for analytics, can be updated by backend/frontend)
    mapping(string => uint256) public urlClicks;

    // Event emitted when a URL is registered
    event URLRegistered(address indexed owner, string shortCode, uint256 timestamp);
    // Event emitted when a URL is clicked (optional, for analytics)
    event URLClicked(string shortCode, uint256 newClickCount);

    // Register a new short code for the sender
    function registerURL(string memory shortCode) public {
        require(urlOwners[shortCode] == address(0), "Short code already registered");
        urlOwners[shortCode] = msg.sender;
        userUrls[msg.sender].push(shortCode);
        urlCreatedAt[shortCode] = block.timestamp;
        urlClicks[shortCode] = 0;
        emit URLRegistered(msg.sender, shortCode, block.timestamp);
    }

    // Get all short codes owned by a user
    function getUserUrls(address user) public view returns (string[] memory) {
        return userUrls[user];
    }

    // Get the owner of a short code
    function getUrlOwner(string memory shortCode) public view returns (address) {
        return urlOwners[shortCode];
    }

    // Get creation timestamp of a short code
    function getUrlCreatedAt(string memory shortCode) public view returns (uint256) {
        return urlCreatedAt[shortCode];
    }

    // Get click count for a short code
    function getUrlClicks(string memory shortCode) public view returns (uint256) {
        return urlClicks[shortCode];
    }

    // (Optional) Backend/frontend can call this to increment click count on-chain
    function incrementClick(string memory shortCode) public {
        require(urlOwners[shortCode] != address(0), "Short code not registered");
        urlClicks[shortCode] += 1;
        emit URLClicked(shortCode, urlClicks[shortCode]);
    }
}
