import { TornError } from './utils/helper'

export interface ITornApi {
  apiKeys: string[]
  market: IMarket
}

export interface IMarket {
  apiKeys: string[]
  bazaar: IBazaar
  itemmarket: IItemmarket
}

interface IBazaar {
  apiKeys: string[]
  /**
   * Get bazaar items
   * @param itemId - Item ID
   * @param limit - Limit of items to return (max 100) default 100
   */
  getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError>
}

interface ItemMarketItem {
  ID: number
  cost: number
  quantity: number
}

interface IItemmarket {
  apiKeys: string[]
  /**
   * Get bazaar items
   * @param itemId - Item ID
   * @param limit - Limit of items to return (max 100) default 100
   */
  getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError>
}