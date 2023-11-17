import { IMarket } from './market'
import { ITorn } from './torn'

export interface ITornApi {
  apiKeys: string[]
  market: IMarket
  torn: ITorn
}