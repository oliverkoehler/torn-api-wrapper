# Torn API Wrapper

A wrapper to integrate with the Torn API. Completely type-safe.

# Table of Contents
1. [Getting Started](#getting-started)
2. [Installing](#installing)
3. [Using the wrapper](#using-the-wrapper)
    1. [Initial idea](#initial-idea)
    2. [Error handling](#error-handling)
    3. [TornAPI](#tornapi)
        1. [removeKey(key: string)](#removekeykey-string)
        2. [checkIfKeyIsValid(key: string): Promise<number | null>](#checkifkeyisvalidkey-string-promisenumber--null)
    4. [Market](#market)
        1. [getLowestListing(itemId: number)](#getlowestlistingitemid-number)
        2. [Bazaar](#bazaar)
            1. [getItems(itemId: number, limit?: number)](#getitemsitemid-number-limit-number)
        3. [Itemmarket](#itemmarket)
            1. [getItems(itemId: number, limit?: number)](#getitemsitemid-number-limit-number-1)
        4. [Pointsmarket](#pointsmarket)
            1. [getPoints()](#getpoints)
            2. [getPointsWithoutIds()](#getpointswithoutids)
   5. [Torn](#torn)
        1. [Items](#items)
            1. [getItemDetails(itemId: number)](#getitemdetailsitemid-number)
            2. [getItemValue(itemId: number)](#getitemvalueitemid-number)
4. [Versioning](#versioning)
5. [Authors](#authors)
6. [Acknowledgments](#acknowledgments)

## Getting Started

In this section I will show you how to install and use the wrapper.
It is possible to pass one `apiKey:string` or `apiKey[]` to the constructor. A random key is selected from the array. If you pass an array of keys, the wrapper will automatically remove the key if the current key is invalid. 

```js
const TornApi = require('torn-api-wrapper').default

const api = new TornApi('YOUR_API_KEY') // Using a single key
const apiPool = new TornApi(['KEY1', 'KEY2', 'KEY3']) // Using a pool of keys

const getBazaarItems = async () => {
  const bazaar = await api.market.bazaar.getItems(206)
  
  if (bazaar) {
    console.log(bazaar)
  } else {
    console.log(api.error)
  }
}

getBazaarItems()
```

### Installing

Install the wrapper as a dev dependency via NPM or yarn.


```
npm i torn-api-wrapper -d
```

```
yarn add torn-api-wrapper -D
```


# Using the wrapper
## Initial idea

The wrapper was built to be as close as possible to the Torn Api, making development as intuitive as possible. One of the 7 sections is always called up first, followed by subcategories and then helper functions.

```js
const market = await api.market.itemmarket.getItems(206)
const bazaar = await api.market.bazaar.getItems(206)
```

## Error handling
The main class `api` contains a `error` property. This property is updated with every request. If an error occurs, the error is stored in the `error` property. The error object contains the following properties: `code` and `message`. The `code` property is the error code of the Torn API. The `message` property is the error message of the Torn API. The requested data is `null` if an error occurs.

```js
const bazaar = await api.market.bazaar.getItems(206)

// Way 1 - With error handling
if (api.error) {
    console.log(api.error)
    // { code: 2, message: 'Incorrect key' }
} else {
    console.log(bazaar)
}

// Way 2 - No error handling
if (bazaar) {
    console.log(bazaar)
}
````
## TornAPI
#### `removeKey(key: string)`
Removes a key from the key pool
```js
api.removeKey('YOUR_API_KEY')
```

#### `checkIfKeyIsValid(key: string): Promise<number | null>`
Checks if a key is valid. Returns the key level if it is valid, otherwise null
```js
await api.checkIfKeyIsValid('YOUR_API_KEY')
````

## Market
#### `getLowestListing(itemId: number)`
Returns the lowest listing for the given itemId. Possible types: `bazaar`, `itemmarket`
```js
const lowestListing = await api.market.getLowestListing(206)
// { type: 'bazaar', cost: 842495, quantity: 6, total_cost: 5054970 }
````
### Bazaar
#### `getItems(itemId: number, limit?: number)`
Returns a list of bazaar listings for the given itemId
```js
const bazaar = await api.market.bazaar.getItems(206)

// [
//   { ID: 73075318, cost: 837000, quantity: 50 },
//   { ID: 49697817, cost: 842700, quantity: 2 },
//   ...
// ]
```
### Itemmarket
#### `getItems(itemId: number, limit?: number)`
Returns a list of itemmarket listings for the given itemId
```js
const itemmarket = await api.market.itemmarket.getItems(206)

// [
//   { ID: 203569084, cost: 840000, quantity: 1 },
//   { ID: 203569089, cost: 840000, quantity: 1 },
//   ...
// ]
``` 

### Pointsmarket
#### `getPoints()`
Returns a object of points market items with there ids
```js
const pointsmarket = await api.market.pointsmarket.getPoints()

// {
//   '14686258': { cost: 45870, quantity: 25, total_cost: 1146750 },
//   '14686272': { cost: 45850, quantity: 2000, total_cost: 91700000 },
//   ...
// }
```

#### `getPointsWithoutIds()`
Returns a object of points market items with there ids
```js
const pointsmarket = await api.market.pointsmarket.getPoints()

// [
//     { cost: 45870, quantity: 25, total_cost: 1146750 },
//     { cost: 45870, quantity: 25, total_cost: 1146750 },
//     ...
// ]
```

## Torn
### Items
#### `getItemDetails(itemId: number[])`
Retrieves the details of an item
```js
const itemDetails = await api.torn.items.getItemDetails([206, 207])

// {
//   "206": {
//     "name": "Xanax",
//     "description": "Increases one's energy.",
//     "effect": "Increases energy by 250 and happiness by 75. Includes side effects.",
//     "requirement": "",
//     "type": "Drug",
//     "weapon_type": null,
//     "buy_price": 0,
//     "sell_price": 0,
//     "market_value": 841051,
//     "circulation": 4841871,
//     "image": "https://www.torn.com/images/items/206/large.png"
//   },
//   "207": {
//     "name": "Ms Torn Crown '07",
//     "description": "Awarded to Vixen_ [140202] for winning the Miss Torn City awards 2007!",
//     "effect": "",
//     "requirement": "",
//     "type": "Collectible",
//     "weapon_type": null,
//     "buy_price": 0,
//     "sell_price": 0,
//     "market_value": 0,
//     "circulation": 1,
//     "image": "https://www.torn.com/images/items/207/large.png"
// }
```

#### `getItemValue(itemId: number)`
Retrieves the value of an item
```js
const itemValue = await api.torn.items.getItemValue(206)

// 842652
```

# Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

# Authors

* **Oliver Köhler** - *Initial work* - [oliverkoehler at GitHub](https://github.com/oliverkoehler)

See also the list of [contributors](https://github.com/oliverkoehler/torn-api-wrapper/graphs/contributors) who participated in this project.


# Acknowledgments

* Inspired by Jgollas Torn API Package - [Torn API](https://github.com/jgolla/torn-api)
* Thank you for the extensive input from [TimbowSix](https://github.com/TimbowSix)
