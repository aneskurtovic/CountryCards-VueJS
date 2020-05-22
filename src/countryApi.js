const API_URL = 'https://restcountries.eu/rest/v2/all';

export default async function getCountries() {
  const response = await fetch(`${API_URL}`);
  const json = await response.json();
  return json.map(({ name, alpha2Code, capital, flag, population, topLevelDomain }) => 
                            ({name, alpha2Code, capital, flag, population, topLevelDomain}));
}
