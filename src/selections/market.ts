import { callTornApi, randomKey, TornError } from '../utils/helper'
import { IMarket, ItemMarketItem, LowestListing, PointListingWithoutId } from '../interfaces/market'

export default class Market implements IMarket {
  private readonly apiKeys: string[]
  bazaar: Bazaar
  itemmarket: Itemmarket
  pointsmarket: Pointsmarket

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
    this.bazaar = new Bazaar(this.apiKeys)
    this.itemmarket = new Itemmarket(this.apiKeys)
    this.pointsmarket = new Pointsmarket(this.apiKeys)
  }

  async getLowestListing(itemId: number): Promise<LowestListing | TornError> {
    const bazaarItems = await this.bazaar.getItems(itemId, 1)
    const itemmarketItems = await this.itemmarket.getItems(itemId, 1)

    if (bazaarItems && itemmarketItems) {
      if (bazaarItems[0].cost < itemmarketItems[0].cost) {
        return {
          type: 'bazaar',
          cost: bazaarItems[0].cost,
          quantity: bazaarItems[0].quantity,
          total_cost: bazaarItems[0].cost * bazaarItems[0].quantity
        }
      } else {
        return {
          type: 'itemmarket',
          cost: itemmarketItems[0].cost,
          quantity: itemmarketItems[0].quantity,
          total_cost: itemmarketItems[0].cost * itemmarketItems[0].quantity
        }
      }
    }
  }
}

class Bazaar {
  private readonly apiKeys: string[]

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
  }

  async getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError> {
    const res = await callTornApi(`/market/${itemId}`, {
      key: randomKey(this.apiKeys),
      selections: 'bazaar',
      limit
    })

    return res.bazaar
  }
}

class Itemmarket {
  private readonly apiKeys: string[]

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
  }

  async getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError> {
    const res = await callTornApi(`/market/${itemId}`, {
      key: randomKey(this.apiKeys),
      selections: 'itemmarket',
      limit
    })

    return res.itemmarket
  }
}

class Pointsmarket {
  private readonly apiKeys: string[]

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
  }

  async getPointsWithoutIds() {
    const res = await callTornApi('/market/', {
      key: randomKey(this.apiKeys),
      selections: 'pointsmarket'
    })

    return Object.values<PointListingWithoutId>(res.pointsmarket)
  }

  async getPoints() {
    const res = await callTornApi('/market/', {
      key: randomKey(this.apiKeys),
      selections: 'pointsmarket'
    })

    return res.pointsmarket
  }
}