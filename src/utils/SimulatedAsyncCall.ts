import { countries } from './Countries';

const getCountries = () => {
  return new Promise<string[]>(resolve => {
    setTimeout(() => resolve(countries), Math.random() * 1000);
  });
};

export const callSimulatedRestCountriesApi = async (params: string) => {
  const countries = await getCountries();
  const filteredCountries = countries.filter((country: string) =>
    country.toLowerCase().includes(params.toLowerCase()),
  );
  return filteredCountries;
};
