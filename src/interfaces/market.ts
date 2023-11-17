import { TornError } from '../utils/helper'

export interface IMarket {
  bazaar: IBazaar
  itemmarket: IItemmarket
  pointsmarket: IPointsMarket

  /**
   * Get the lowest listing for item
   * @param itemId - Item ID
   */
  getLowestListing(itemId: number): Promise<LowestListing | TornError>
}

export interface ItemMarketItem {
  ID: number
  cost: number
  quantity: number
}

interface IBazaar {
  /**
   * Get bazaar items
   * @param itemId - Item ID
   * @param limit - Limit of items to return (max 100) default 100
   */
  getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError>
}

interface IItemmarket {
  /**
   * Get bazaar items
   * @param itemId - Item ID
   * @param limit - Limit of items to return (max 100) default 100
   */
  getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError>
}

export type PointListingWithoutId = {
  cost: number
  quantity: number
  total_cost: number
}

type PointListing = {
  [id: string]: PointListingWithoutId
}

interface IPointsMarket {
  /**
   * Get points market listings
   */
  getPoints(): Promise<PointListing[] | TornError>
  getPointsWithoutIds(): Promise<PointListingWithoutId[] | TornError>
}

export interface LowestListing {
  type: 'bazaar' | 'itemmarket'
  cost: number
  quantity: number
  total_cost: number
}