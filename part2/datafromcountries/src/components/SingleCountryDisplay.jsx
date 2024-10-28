import countriesService from "../services/countries";
const SingleCountryDisplay = ({ countryData, countryName, onShow }) => {
  // conditional rendering if the data has been loaded
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default SingleCountryDisplay;
