import axios from 'axios'
import Market from './selections/market'
import Torn from './selections/torn'
import { ITornApi } from './interfaces/selections'
import { IMarket } from './interfaces/market'
import { ITorn } from './interfaces/torn'

axios.defaults.baseURL = 'https://api.torn.com'

export default class TornApi implements ITornApi {
  apiKeys: string[]
  market: IMarket
  torn: ITorn

  /**
   * @param apiKeys - An array of API keys or a single API key
   */
  constructor(apiKeys: string[] | string) {
    this.apiKeys = Array.isArray(apiKeys) ? apiKeys : [apiKeys]

    this.market = new Market(this.apiKeys)
    this.torn = new Torn(this.apiKeys)
  }
}