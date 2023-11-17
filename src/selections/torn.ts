import { IItemDetails, IItems, ITorn } from '../interfaces/torn'
import { callTornApi, TornError } from '../utils/helper'
import { ITornApi } from '../interfaces/selections'

export default class Torn implements ITorn {
  api: ITornApi
  items: Items

  constructor(api: ITornApi) {
    this.api = api
    this.items = new Items(api)
  }
}

class Items implements IItems {
  api: ITornApi

  constructor(api: ITornApi) {
    this.api = api
  }

  async getItemDetails(itemId: number): Promise<IItemDetails[] | TornError> {
    const res = await callTornApi(`/torn/${itemId}`, {
      key: this.api.getKey(),
      selections: 'items'
    })

    return res.items[itemId]
  }

  async getItemValue(itemId: number): Promise<number | TornError> {
    const res = await callTornApi(`/torn/${itemId}`, {
      key: this.api.getKey(),
      selections: 'items'
    })

    return res.items[itemId].market_value
  }
}