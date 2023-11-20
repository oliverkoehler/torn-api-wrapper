export interface IMarket {
  bazaar: IBazaar
  itemmarket: IItemmarket
  pointsmarket: IPointsMarket

  /**
   * Get the lowest listing for item
   * @param itemId - Item ID
   */
  getLowestListing(itemId: number): Promise<LowestListing | null>
}

export interface IItemMarketItem {
  ID: number
  cost: number
  quantity: number
}

export interface IBazaar {
  /**
   * Get bazaar items
   * @param itemId - Item ID
   * @param limit - Limit of items to return (max 100) default 100
   */
  getItems(itemId: number, limit?: number): Promise<IItemMarketItem[] | null>
}

export interface IItemmarket {
  /**
   * Get bazaar items
   * @param itemId - Item ID
   * @param limit - Limit of items to return (max 100) default 100
   */
  getItems(itemId: number, limit?: number): Promise<IItemMarketItem[] | null>
}

export type PointListingWithoutId = {
  cost: number
  quantity: number
  total_cost: number
}

export type PointListing = {
  [id: string]: PointListingWithoutId
}

interface IPointsMarket {
  /**
   * Get points market listings
   */
  getPoints(): Promise<PointListing[] | null>
  getPointsWithoutIds(): Promise<PointListingWithoutId[] | null>
}

export interface LowestListing {
  type: 'bazaar' | 'itemmarket'
  id: number
  cost: number
  quantity: number
  total_cost: number
}