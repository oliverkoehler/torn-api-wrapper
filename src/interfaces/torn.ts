import { TornError } from '../utils/helper'

export interface ITorn {
  items: IItems
}

export interface IItems {
  getItemDetails(itemId: number): Promise<IItemDetails[] | TornError>
  getItemValue(itemId: number): Promise<number | TornError>
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