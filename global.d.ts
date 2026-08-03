import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
    interface Window {
        ethereum? : MetaMaskInpageProvider
    }
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";

export {};