import { CryptoModel } from "./crypto"

export interface CryptoInWallet {
    cryptoID: string,
    crypto: number
}

export interface Wallet {
    user: string,
    usd: number,
    cryptos: Array<CryptoInWallet>
}

export interface CryptoInWalletInfo {
    cryptoModel: CryptoModel,
    crypto: number
}