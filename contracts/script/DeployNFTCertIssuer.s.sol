// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {NFTCertIssuer} from "../src/NFTCertIssuer.sol";

contract DeployNFTCertIssuer is Script {
    string constant NAME = "TCC7 Certificates";
    string constant SYMBOL = "TCC7CERT";

    function run() external returns (NFTCertIssuer) {
        
        vm.startBroadcast();

        NFTCertIssuer cert = new NFTCertIssuer(NAME, SYMBOL);

        vm.stopBroadcast();

        console.log("NFTCertIssuer deployed at:", address(cert));
        console.log("Owner:", cert.owner());

        return cert;
    }
}