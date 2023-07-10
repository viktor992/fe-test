type RestCountriesApiResponse = {
  name: {
    common: string;
  };
};

export const callRestCountriesApi = async (params: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/all?fields=name`,
  );
  if (response.ok) {
    const responseData = ((await response.json()) ||
      []) as RestCountriesApiResponse[];
    const countries = responseData.map(
      (country: RestCountriesApiResponse) => country.name.common,
    );
    const filteredCountries = countries.filter((country: string) =>
      country.toLowerCase().includes(params.toLowerCase()),
    );
    return filteredCountries;
  } else {
    throw new Error('Unexpected error');
  }
};
