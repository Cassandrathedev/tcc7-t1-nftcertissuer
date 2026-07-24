// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title NFTCertIssuer
/// @notice Soulbound (non-transferable) NFT certificates for course/event completion.
/// @dev Only the contract owner or approved issuer addresses can mint certificates.
contract NFTCertIssuer is ERC721, Ownable {
    struct Certificate {
        string recipientName;
        string courseOrEvent;
        uint256 issuedAt;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(address => bool) public isIssuer;
    uint256 private _nextTokenId;

    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);
    event CertificateIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        string recipientName,
        string courseOrEvent
    );

    error NotAuthorizedIssuer();
    error SoulboundTokenNonTransferable();
    error CertificateDoesNotExist();

    modifier onlyIssuer() {
        if (msg.sender != owner() && !isIssuer[msg.sender]) {
            revert NotAuthorizedIssuer();
        }
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) Ownable(msg.sender) {}

    function addIssuer(address issuer) external onlyOwner {
        isIssuer[issuer] = true;
        emit IssuerAdded(issuer);
    }

    function removeIssuer(address issuer) external onlyOwner {
        isIssuer[issuer] = false;
        emit IssuerRemoved(issuer);
    }

    function issueCertificate(
        address recipient,
        string calldata recipientName,
        string calldata courseOrEvent
    ) external onlyIssuer returns (uint256 tokenId) {
        tokenId = _nextTokenId++;

        certificates[tokenId] = Certificate({
            recipientName: recipientName,
            courseOrEvent: courseOrEvent,
            issuedAt: block.timestamp
        });

        _safeMint(recipient, tokenId);

        emit CertificateIssued(tokenId, recipient, recipientName, courseOrEvent);
    }

    function getCertificate(
        uint256 tokenId
    ) external view returns (string memory recipientName, string memory courseOrEvent, uint256 issuedAt) {
        if (_ownerOf(tokenId) == address(0)) revert CertificateDoesNotExist();
        Certificate memory cert = certificates[tokenId];
        return (cert.recipientName, cert.courseOrEvent, cert.issuedAt);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert SoulboundTokenNonTransferable();
        }
        return super._update(to, tokenId, auth);
    }

    function burn(uint256 tokenId) external {
        if (ownerOf(tokenId) != msg.sender) revert NotAuthorizedIssuer();
        _update(address(0), tokenId, msg.sender);
    }
}
