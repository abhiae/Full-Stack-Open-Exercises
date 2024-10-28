import { useEffect, useState } from "react";
import countriesService from "../services/countries";
import weatherService from "../services/weather";
import SingleCountryDisplay from "./SingleCountryDisplay";
const CountriesDisplay = ({ filteredCountries, searchText }) => {
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  //fetch data when a country is chosen
  useEffect(() => {
    if (selectedCountry) {
      countriesService
        .getCountryInfo(selectedCountry)
        .then((countryDataPromise) => {
          setCountryData(countryDataPromise);
          // console.log(countryData);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (countryData) {
      const lat = countryData.capitalInfo.latlng[0];
      const lon = countryData.capitalInfo.latlng[1];
      weatherService.getWeatherInfo(lat, lon).then((weatherDataPromise) => {
        setWeatherData(weatherDataPromise);
      });
    }
  }, [countryData]);
  // fetch data when only one country remains
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [filteredCountries]);
  if (searchText.trim() === "") return null;

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1 && !selectedCountry) {
    return filteredCountries.map((country) => (
      <div key={country}>
        <span>{country}</span>
        <button
          onClick={() => {
            setCountryData(null);
            setSelectedCountry(country);
          }}
        >
          show
        </button>
      </div>
    ));
  } else if (filteredCountries.length === 1 || selectedCountry) {
    return (
      <SingleCountryDisplay
        countryData={countryData}
        weatherData={weatherData}
      />
    );
  }
  return null;
};
export default CountriesDisplay;
