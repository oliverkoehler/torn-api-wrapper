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
  debug: boolean = false
  private retryTimeout: number = 5000
  private retries: number = 0

  /**
   * @param apiKeys - An array of API keys or a single API key
   */
  constructor(apiKeys: string[] | string) {
    this.apiKeys = Array.isArray(apiKeys) ? apiKeys : [apiKeys]

    this.market = new Market(this)
    this.torn = new Torn(this)
  }

  /**
   * Sets the debug property of the class.
   *
   * @param debug - Whether to enable debug mode or not.
   */
  setDebug(debug: boolean) {
    this.debug = debug
  }

  setRetryTimeout(timeout: number) {
    this.retryTimeout = timeout
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
 * This method is used to make a GET request to the Torn API.
 *
 * @async
 * @param {string} url - The endpoint of the Torn API to call.
 * @param {object} [params] - The parameters to pass along with the GET request.
 * @returns {Promise<object>} - The data returned from the Torn API or null if an error occurred.
 *
 * The method works as follows:
 * 1. It makes a GET request to the provided URL with the provided parameters.
 * 2. If the response contains an error, it sets the error property of the class to the error received.
 * 3. If the error code is 2, it removes the API key used from the list of API keys.
 * 4. If the number of retries is less than 5, it increments the retries and makes the API call again.
 * 5. If the response does not contain an error, it resets the retries to 0, clears the error property and returns the data.
 * 6. If an exception occurs during the API call, it sets the error property to the error received and returns null.
 */
  async callTornApi (url: string, params?): Promise<object> {
    try {
      if (this.debug) {
        console.log('Calling Torn API... ', url, params)
      }

      const { data } = await axios.get(url, {
        params
      })

      if (data.error) {
        if (this.debug) console.log('Wrapper API Error: ', data.error.error, ' Code: ', data.error.code, ' Retries: ', this.retries)
        this.error = {
          code: data.error.code,
          message: data.error.error
        }

        if (data.error.code === 2) {
          this.removeKey(params.key)
        }

        if (this.retries < 5) {
          setTimeout(async () => {
            this.retries++
            await this.callTornApi(url, params)
          }, this.retryTimeout)
        }

        return null
      } else {
        this.retries = 0
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