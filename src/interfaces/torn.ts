import { PointListingWithoutId } from './market'

export interface ITorn {
  items: IItems
}

export interface IItems {
  getItemDetails(itemId: number[]): Promise<{ [id: string]: IItemDetails }  | null>
  getItemValue(itemId: number): Promise<number  | null>
}

export interface IItemDetails {
  buy_price: number
  circulation: number
  coverage: object | null
  description: string
  effect: string
  image: string
  market_value: number
  name: string
  requirement: string
  requirements: string
  sell_price: number
  type: string
  weapon_type: string | null
}