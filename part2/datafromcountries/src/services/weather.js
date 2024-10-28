import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/3.0/onecall?";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getWeatherInfo = (lat, lon) => {
  const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);
  return request.then((response) => response.data);
};
export default { getWeatherInfo };
