import { IMarket } from './market'

export interface ITornApi {
  apiKeys: string[]
  market: IMarket
}

export interface LowestListing {
  type: 'bazaar' | 'itemmarket'
  cost: number
  quantity: number
  total_cost: number
}