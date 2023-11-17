import TornApi from "."

const test = async () => {
  const api = new TornApi('sp02EVqxfrX1TzvD')
  console.log(await api.market.bazzar.getItems(206))
}

test ()