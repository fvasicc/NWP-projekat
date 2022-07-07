export interface CryptoHistoryModel {
    priceUsd : string
    time : number
    date : string
}

export interface AssetsHistoryModel {
    data : Array<CryptoHistoryModel>
    time : number
}