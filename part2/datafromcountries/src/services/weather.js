import axios from "axios";
// used weatherapi instead of openweather because it didn't give an authorized key for free even after many hours
const baseUrl = "http://api.weatherapi.com/v1/current.json?key=";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherInfo = (lat, lon) => {
  const request = axios.get(`${baseUrl}${apiKey}&q=${lat},${lon}`);
  return request.then((response) => response.data);
};
export default { getWeatherInfo };
