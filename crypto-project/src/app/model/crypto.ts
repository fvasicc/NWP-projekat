export interface CryptoModel {
    id : String
    rank : String
    symbol : String
    name : String
    supply : String
    maxSupply : String | null
    marketCapUsd : String
    volumeUsd24Hr : String
    priceUsd : String
    changePercent24Hr : String
    vwap24Hr: String
}
