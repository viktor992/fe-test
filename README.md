# React Autocomplete

Autocomplete component implemented using React and Typescript.

## Description

The project consists of two main parts:

- Autocomplete component: This component handles user input, executes different handlers, and displays the suggestions obtained from the options prop.

- useAsyncCall hook: This custom hook is responsible for fetching data based on specified fetchers whenever there are changes in the parameters. The hook returns updated information about loading states, errors, and data.

To showcase the flexibility of the useAsyncCall hook, the demo includes two different fetchers:

- callRestCountriesApi: obtains data from the restcountries.com API and provides suggestions based on country names.
- callSimulatedRestCountriesApi: retrieves data from an in-memory list and simulates asynchronous calls using promises.

## Technologies used

- Typescript
- React

## Development

First, install the dependencies

```
yarn install
```

To start the development server and view the demo, run the following command:

```
yarn dev
```

## Testing

To run tests, use the following command:

```
yarn test
```
