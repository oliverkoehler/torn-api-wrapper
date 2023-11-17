import axios from 'axios'

/**
 * Returns a random key from an array of keys
 * @param keys
 * @returns {string}
 */
export const randomKey = (keys: string[]): string => {
  return keys[Math.floor(Math.random() * keys.length)]
}

export class TornError extends Error {
  constructor({ code, message }) {
    super(message)
    this.name = code
  }
}

export const callTornApi = async (url: string, params: object) => {
  const { data } = await axios.get(url, {
    params
  })

  if (data.error) throw new TornError({ code: data.error.code, message: data.error.error })

  return data
}