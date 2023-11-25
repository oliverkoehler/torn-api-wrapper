import { IMarket } from './market'
import { ITorn } from './torn'

/**
 * A custom error class to throw when the Torn API returns an error
 */
export class TornError extends Error {
  constructor({ code, message }) {
    super(message)
    this.name = code
  }
}

export interface ITornError {
  code: number
  message: string
}

export interface ITornApi {
  market: IMarket
  torn: ITorn
  error: ITornError | undefined

  /**
   * @returns A random API key from the passed api keys
   */
  getKey(): string
  removeKey(key: string): void
  checkIfKeyIsValid(key: string): Promise<number | null>
  callTornApi(url: string, params?: object): Promise<any | null>
}