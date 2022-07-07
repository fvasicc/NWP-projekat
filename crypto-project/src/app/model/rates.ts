export interface RatesModel {
    id : string
    symbol : string
    currencySymbol : string
    type : string
    rateUsd : string
}

export interface AssetsRatesModel {
    data : Array<RatesModel>
    timestamp : number
}