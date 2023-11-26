import axios from 'axios'
import Market from './selections/market'
import Torn from './selections/torn'
import { ITornApi, ITornError } from './interfaces/base'
import { IMarket } from './interfaces/market'
import { ITorn } from './interfaces/torn'

axios.defaults.baseURL = 'https://api.torn.com'

class TornApi implements ITornApi {
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
   * Removes a specified API key from the list of API keys.
   *
   * @param key - The API key to be removed.
   */
  removeKey(key: string) {
    this.apiKeys = this.apiKeys.filter(k => k !== key)
  }

  addKey(key: string) {
    this.apiKeys.push(key)
  }

  async checkIfKeyIsValid(key: string): Promise<number | null> {
    const res = await this.callTornApi('/key/', {
      selections: 'info',
      comment: 'Torn API Wrapper',
      key
    })

    if (!res) return null
    else { // @ts-ignore
      return res?.access_level
    }
  }

  /**
   * A helper function to call the Torn API and return the data or an error
   * @param url
   * @param params
   */
  async callTornApi (url: string, params?): Promise<object> {
    try {
      const { data } = await axios.get(url, {
        params
      })

      if (data.error) {
        this.error = {
          code: data.error.code,
          message: data.error.error
        }

        if (data.error.code === 2) {
          this.removeKey(params.key)
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

export { TornApi as default, TornApi }