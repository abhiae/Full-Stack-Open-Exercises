import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import CountriesDisplay from "./components/CountriesDisplay";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((allCountriesData) => {
      const countriesList = allCountriesData.map(
        (countriesData) => countriesData.name.common
      );
      setCountries(countriesList);
    });
  }, []);

  // Implement search with useEffect here
  useEffect(() => {
    const filteredCountriesTemp = countries.filter((country) =>
      country.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCountries(filteredCountriesTemp);
  }, [searchText, countries]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      <div>
        find countries <input value={searchText} onChange={handleSearch} />
      </div>
      <CountriesDisplay
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
        searchText={searchText}
      />
    </>
  );
}

export default App;
