import { IMarket } from './market'
import { ITorn } from './torn'

export interface ITornApi {
  market: IMarket
  torn: ITorn

  getKey(): string
}