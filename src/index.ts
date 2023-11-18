import axios from 'axios'
import Market from './selections/market'
import Torn from './selections/torn'
import { ITornApi, ITornError } from './interfaces/base'
import { IMarket } from './interfaces/market'
import { ITorn } from './interfaces/torn'

axios.defaults.baseURL = 'https://api.torn.com'

export default class TornApi implements ITornApi {
  apiKeys: string[]
  market: IMarket
  torn: ITorn
  error: ITornError

  /**
   * @param apiKeys - An array of API keys or a single API key
   */
  constructor(apiKeys: string[] | string) {
    this.apiKeys = Array.isArray(apiKeys) ? apiKeys : [apiKeys]

    this.market = new Market(this)
    this.torn = new Torn(this)
  }

  // return a random key from the array
  getKey() {
    return this.apiKeys[Math.floor(Math.random() * this.apiKeys.length)]
  }

  /**
   * A helper function to call the Torn API and return the data or an error
   * @param url
   * @param params
   */
  async callTornApi (url: string, params?: object): Promise<object> {
    try {
      const { data } = await axios.get(url, {
        params
      })

      if (data.error) {
        this.error = {
          code: data.error.code,
          message: data.error.error
        }
        return null
      } else {
        this.error = undefined
        return data
      }
    } catch(e) {
      this.error = {
        code: e.response.data.error.code,
        message: e.response.data.error.error
      }
      return null
    }
  }
}