import axios from "axios";

export default class Market {
  apiKey: string;
  bazzar: Bazzar;
  itemmarket: Itemmarket;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.bazzar = new Bazzar(apiKey)
    this.itemmarket = new Itemmarket(apiKey)
  }
}



class Bazzar {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getItems(itemId: number) {
    const res = await axios.get('https://api.torn.com/market/' + itemId + '?selections=bazaar&key=' + this.apiKey)
    return res.data
  }
}

class Itemmarket {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getItems(itemId: number) {
    const res = await axios.get('https://api.torn.com/market/' + itemId + '?selections=itemmarket&key=' + this.apiKey)
    return res.data
  }
}