import Market from './selections/market'
import { IMarket, ITornApi } from './interfaces'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.torn.com'

export default class TornApi implements ITornApi {
  apiKeys: string[]
  market: IMarket

  /**
   * @param apiKeys - An array of API keys or a single API key
   */
  constructor(apiKeys: string[] | string) {
    if (Array.isArray(apiKeys)) {
      this.apiKeys = apiKeys
    } else {
      this.apiKeys = [apiKeys]
    }

    this.market = new Market(this.apiKeys)
  }
}