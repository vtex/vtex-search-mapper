# vtex-search-mapper

## Usage

```
yarn add @vtex/vtex-search-mapper
```

```ts
import { convertFromBiggyProductsToCatalogApiProducts, BiggySearchResult, BiggyProduct, CatalogApiProduct } from '@vtex/vtex-search-mapper'

// ...

const biggySearchResult: BiggySearchResult = await myBiggyClientGetSearchResults(params)
const biggyProducts: BiggyProduct[] = biggySearchResult.products

const newProducts: CatalogApiProduct[] = convertFromBiggyProductsToCatalogApiProducts(biggyProducts)
```

## Developing this module

### Setup

```
yarn
```

### Run tests

```
yarn test
```

### Develop tests in watch mode

```
yarn jest
```

### Link this app to other module and develop changes

On this project:

```
yarn link
```

To watch changes locally:

```
yarn watch
```

On the other project:

```
yarn link @vtex/vtex-search-mapper
```

Then any changes you make on this project will reflect on the project that uses it

## Release

To release new versions use semver pattern and follow the next commands to choose how to release this package on npm

### Patch version

```
yarn release
```

### Minor version

```
yarn release-minor
```

### Patch version

```
yarn release-patch
```