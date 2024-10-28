const SingleCountryDisplay = ({ countryData, weatherData }) => {
  return (
    <div>
      {countryData ? (
        <>
          <h2>{countryData.name.common}</h2>
          <p>Capital {countryData.capital}</p>
          <p>area {countryData.area}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(countryData.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            style={{ height: 200, width: "auto" }}
            src={countryData.flags.png}
            alt={countryData.flags.alt}
          />
          <h2>Weather in {countryData.capital}</h2>
          <p>temperature {weatherData.current.temp_c} Celcius</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.clear}
          />
          <p>wind {weatherData.current.wind_kph} km/h</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default SingleCountryDisplay;
