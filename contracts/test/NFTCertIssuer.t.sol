// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {NFTCertIssuer} from "../src/NFTCertIssuer.sol";

contract NFTCertIssuerTest is Test {
    NFTCertIssuer cert;

    address owner = address(this);
    address issuer = makeAddr("issuer");
    address stranger = makeAddr("stranger");
    address recipient = makeAddr("recipient");

    function setUp() public {
        cert = new NFTCertIssuer("TCC7 Certificates", "TCC7CERT");
    }

    function test_OwnerCanIssueCertificate() public {
        uint256 tokenId = cert.issueCertificate(recipient, "Jay Kahuna", "Web3 Bootcamp");
        assertEq(cert.ownerOf(tokenId), recipient);

        (string memory name, string memory course, uint256 issuedAt) = cert.getCertificate(tokenId);
        assertEq(name, "Jay Kahuna");
        assertEq(course, "Web3 Bootcamp");
        assertEq(issuedAt, block.timestamp);
    }

    function test_ApprovedIssuerCanIssueCertificate() public {
        cert.addIssuer(issuer);

        vm.prank(issuer);
        uint256 tokenId = cert.issueCertificate(recipient, "Jay Kahuna", "Web3 Bootcamp");

        assertEq(cert.ownerOf(tokenId), recipient);
    }

    function test_RevertWhen_StrangerTriesToIssue() public {
        vm.prank(stranger);
        vm.expectRevert(NFTCertIssuer.NotAuthorizedIssuer.selector);
        cert.issueCertificate(recipient, "Jay Kahuna", "Web3 Bootcamp");
    }

    function test_RevertWhen_RemovedIssuerTriesToIssue() public {
        cert.addIssuer(issuer);
        cert.removeIssuer(issuer);

        vm.prank(issuer);
        vm.expectRevert(NFTCertIssuer.NotAuthorizedIssuer.selector);
        cert.issueCertificate(recipient, "Jay Kahuna", "Web3 Bootcamp");
    }

    function test_RevertWhen_TransferAttempted() public {
        uint256 tokenId = cert.issueCertificate(recipient, "Jay Kahuna", "Web3 Bootcamp");

        vm.prank(recipient);
        vm.expectRevert(NFTCertIssuer.SoulboundTokenNonTransferable.selector);
        cert.transferFrom(recipient, stranger, tokenId);
    }

    function test_HolderCanBurnOwnCertificate() public {
        uint256 tokenId = cert.issueCertificate(recipient, "Jay Kahuna", "Web3 Bootcamp");

        vm.prank(recipient);
        cert.burn(tokenId);

        vm.expectRevert(NFTCertIssuer.CertificateDoesNotExist.selector);
        cert.getCertificate(tokenId);
    }
}
