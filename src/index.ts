import Market from "./selections/market"
import { ITornApi } from "./interfaces"

export default class TornApi implements ITornApi {
  apiKey: string;
  market: Market

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.market = new Market(apiKey)
  }
}