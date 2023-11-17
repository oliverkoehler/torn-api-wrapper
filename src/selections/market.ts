import axios from 'axios'
import { randomKey } from '../utils/helper'

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

  async getItems(itemId: number) {
    const res = await axios.get('https://api.torn.com/market/' + itemId + '?selections=bazaar&key=' + this.apiKeys[0])
    return res.data
  }
}

class Itemmarket {
  apiKeys: string[]

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
  }

  async getItems(itemId: number) {
    const res = await axios.get('https://api.torn.com/market/' + itemId + '?selections=itemmarket&key=' + this.apiKeys[0])
    return res.data
  }
}