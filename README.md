# Torn API Wrapper

A wrapper to integrate with the Torn API. Completely type-safe.

## Getting Started

In this section I will show you how to install and use the wrapper.

```js
import TornApi from '.'


const api = new TornApi('YOUR_API_KEY') // Using a single key
const apiPool = new TornApi(['KEY1', 'KEY2', 'KEY3']) // Using a pool of keys

const getBazaarItems = async () => {
  const bazaar = await api.market.bazaar.getItems(206).catch(e => console.log(e))
  
  if (bazaar) {
    console.log(bazaar)
  }
}

getBazaarItems ()
```

### Installing

Install the wrapper as a dev dependency via NPM or yarn.


```
npm i torn-api-wrapper -d
```

```
yarn add torn-api-wrapper -D
```


## Using the wrapper
### Initial idea

The wrapper was built to be as close as possible to the Torn Api, making development as intuitive as possible. One of the 7 sections is always called up first, followed by subcategories and then helper functions.

```
const market = await api.market.itemmarket.getItems(206)
const bazaar = await api.market.bazaar.getItems(206)
```
### Market
#### Bazaar
##### `getItems(itemId: number, limit?: number)`
Returns a list of bazaar listings for the given itemId
```js
const bazaar = await api.market.bazaar.getItems(206).catch(e => {
  console.log(e)
})

if (bazaar) {
  console.log(bazaar)
}

// [
//   { ID: 73075318, cost: 837000, quantity: 50 },
//   { ID: 49697817, cost: 842700, quantity: 2 },
//   ...
// ]
``` 

#### Itemmarket
##### `getItems(itemId: number, limit?: number)`
Returns a list of itemmarket listings for the given itemId
```js
const itemmarket = await api.market.itemmarket.getItems(206).catch(e => {
  console.log(e)
})

if (itemmarket) {
  console.log(itemmarket)
}

// [
//   { ID: 203569084, cost: 840000, quantity: 1 },
//   { ID: 203569089, cost: 840000, quantity: 1 },
//   ...
// ]
``` 



## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Oliver Köhler** - *Initial work* - [oliverkoehler at GitHub](https://github.com/oliverkoehler)

See also the list of [contributors](https://github.com/oliverkoehler/torn-api-wrapper/graphs/contributors) who participated in this project.


## Acknowledgments

* Inspired by Jgollas Torn API Package - [Torn API](https://github.com/jgolla/torn-api)
