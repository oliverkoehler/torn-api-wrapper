import axios, { AxiosError } from 'axios'
import { callTornApi, randomKey, TornError } from '../utils/helper'

export default class Market {
  apiKeys: string[]
  bazaar: Bazaar
  itemmarket: Itemmarket

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
    this.bazaar = new Bazaar(this.apiKeys)
    this.itemmarket = new Itemmarket(this.apiKeys)
  }
}

class Bazaar {
  apiKeys: string[]

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
  }

  async getItems(itemId: number, limit?: number) {
    const res = await callTornApi(`/market/${itemId}`, {
      key: randomKey(this.apiKeys),
      selections: 'bazaar',
      limit
    })

    return res.bazaar
  }
}

class Itemmarket {
  apiKeys: string[]

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
  }

  async getItems(itemId: number, limit?: number) {
    const res = await callTornApi(`/market/${itemId}`, {
      key: randomKey(this.apiKeys),
      selections: 'itemmarket',
      limit
    })

    return res.itemmarket
  }
}