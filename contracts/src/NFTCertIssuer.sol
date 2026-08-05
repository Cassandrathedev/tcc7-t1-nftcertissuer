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
        address issuer;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => bool) public isIssuer;
    uint256 private _nextTokenId;

    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);
    event CertificateIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        string recipientName,
        string courseOrEvent,
        string metadataURI
    );
    event CertificateRevoked(uint256 indexed tokenId);

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

    /// @notice Grant issuer permission to an address (owner only)
    function addIssuer(address issuer) external onlyOwner {
        isIssuer[issuer] = true;
        emit IssuerAdded(issuer);
    }

    /// @notice Revoke issuer permission from an address (owner only)
    function removeIssuer(address issuer) external onlyOwner {
        isIssuer[issuer] = false;
        emit IssuerRemoved(issuer);
    }

    /// @notice Issue a new certificate NFT to a recipient
    /// @param recipient Address that will hold the certificate
    /// @param recipientName Name to record on the certificate
    /// @param courseOrEvent Course or event name to record on the certificate
    /// @param metadataURI IPFS (or other) URI pointing to the certificate's metadata JSON
    /// @return tokenId The id of the newly minted certificate
    function issueCertificate(
        address recipient,
        string calldata recipientName,
        string calldata courseOrEvent,
        string calldata metadataURI
    ) external onlyIssuer returns (uint256 tokenId) {
        tokenId = _nextTokenId++;

        certificates[tokenId] = Certificate({
            recipientName: recipientName,
            courseOrEvent: courseOrEvent,
            issuedAt: block.timestamp
            issuer: msg.sender

        });
        _tokenURIs[tokenId] = metadataURI;

        _safeMint(recipient, tokenId);

        emit CertificateIssued(tokenId, recipient, recipientName, courseOrEvent, metadataURI);
    }

    /// @notice Read back a certificate's details
    function getCertificate(
        uint256 tokenId
    ) external view returns (string memory recipientName, string memory courseOrEvent, uint256 issuedAt) {
        if (_ownerOf(tokenId) == address(0)) revert CertificateDoesNotExist();
        Certificate memory cert = certificates[tokenId];
        return (cert.recipientName, cert.courseOrEvent, cert.issuedAt);
    }

    /// @notice Returns the metadata URI for a given certificate, per the ERC-721 standard
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (_ownerOf(tokenId) == address(0)) revert CertificateDoesNotExist();
        return _tokenURIs[tokenId];
    }

    /// @dev Overridden to make tokens soulbound: block all transfers after minting.
    /// Allows mint (from == address(0)) and admin revoke/burn (to == address(0)), blocks everything else.
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

    /// @notice Owner-only revocation of a certificate (e.g. minted in error, academic misconduct).
    /// @dev Holders cannot revoke their own certificates — this preserves certificates as
    /// permanent proof of achievement unless the issuing authority explicitly revokes one.
    function revokeCertificate(uint256 tokenId) external onlyOwner {
        if (_ownerOf(tokenId) == address(0)) revert CertificateDoesNotExist();
        _update(address(0), tokenId, address(0));
        delete certificates[tokenId];
        delete _tokenURIs[tokenId];
        emit CertificateRevoked(tokenId);
    }
}