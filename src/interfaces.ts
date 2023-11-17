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
  getItems(itemId: number): Promise<unknown>
}

interface IItemmarket {
  apiKeys: string[]
  getItems(itemId: number): Promise<unknown>
}