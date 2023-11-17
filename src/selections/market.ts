import { callTornApi, randomKey, TornError } from '../utils/helper'
import { IMarket, ItemMarketItem, LowestListing, PointListingWithoutId } from '../interfaces/market'
import { ITornApi } from '../interfaces/selections'

export default class Market implements IMarket {
  api: ITornApi
  bazaar: Bazaar
  itemmarket: Itemmarket
  pointsmarket: Pointsmarket

  constructor(api: ITornApi) {
    this.api = api
    this.bazaar = new Bazaar(api)
    this.itemmarket = new Itemmarket(api)
    this.pointsmarket = new Pointsmarket(api)
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
  api: ITornApi

  constructor(api: ITornApi) {
    this.api = api
  }

  async getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError> {
    const res = await callTornApi(`/market/${itemId}`, {
      key: this.api.getKey(),
      selections: 'bazaar',
      limit
    })

    return res.bazaar
  }
}

class Itemmarket {
  api: ITornApi

  constructor(api: ITornApi) {
    this.api = api
  }

  async getItems(itemId: number, limit?: number): Promise<ItemMarketItem[] | TornError> {
    const res = await callTornApi(`/market/${itemId}`, {
      key: this.api.getKey(),
      selections: 'itemmarket',
      limit
    })

    return res.itemmarket
  }
}

class Pointsmarket {
  api: ITornApi

  constructor(api: ITornApi) {
    this.api = api
  }

  async getPointsWithoutIds() {
    const res = await callTornApi('/market/', {
      key: this.api.getKey(),
      selections: 'pointsmarket'
    })

    return Object.values<PointListingWithoutId>(res.pointsmarket)
  }

  async getPoints() {
    const res = await callTornApi('/market/', {
      key: this.api.getKey(),
      selections: 'pointsmarket'
    })

    return res.pointsmarket
  }
}