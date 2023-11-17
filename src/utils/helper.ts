/**
 * Returns a random key from an array of keys
 * @param keys
 * @returns {string}
 */
export const randomKey = (keys: string[]): string => {
  return keys[Math.floor(Math.random() * keys.length)]
}