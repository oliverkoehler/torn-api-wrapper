import { IItemDetails, IItems, ITorn } from '../interfaces/torn'
import { ITornApi, TornError } from '../interfaces/base'

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

  async getItemDetails(itemIds: number[]) {
    const res = await this.api.callTornApi(`/torn/${itemIds}`, {
      key: this.api.getKey(),
      selections: 'items'
    })

    return res?.items
  }

  async getItemValue(itemId: number): Promise<number | null> {
    const res = await this.api.callTornApi(`/torn/${itemId}`, {
      key: this.api.getKey(),
      selections: 'items'
    })

    return res?.items[itemId].market_value
  }
}