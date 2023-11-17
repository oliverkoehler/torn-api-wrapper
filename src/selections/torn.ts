import { IItemDetails, IItems, ITorn } from '../interfaces/torn'
import { callTornApi, randomKey, TornError } from '../utils/helper'

export default class Torn implements ITorn {
  private readonly apiKeys: string[]
  items: Items

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
    this.items = new Items(this.apiKeys)
  }
}

class Items implements IItems {
  private readonly apiKeys: string[]

  constructor(apiKeys: string[]) {
    this.apiKeys = apiKeys
  }

  async getItemDetails(itemId: number): Promise<IItemDetails[] | TornError> {
    const res = await callTornApi(`/torn/${itemId}`, {
      key: randomKey(this.apiKeys),
      selections: 'items'
    })

    return res.items[itemId]
  }

  async getItemValue(itemId: number): Promise<number | TornError> {
    const res = await callTornApi(`/torn/${itemId}`, {
      key: randomKey(this.apiKeys),
      selections: 'items'
    })

    return res.items[itemId].market_value
  }
}