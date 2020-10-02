export enum FilterType{
    COLOR, BRAND,PRICE
}

export type Filter = {
    id:string,
    type:FilterType
    label:string,
    attribute:string,
    value:string
}