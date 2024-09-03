import axios from "axios";

const API_KEY = "your_openweathermap_api_key";

interface WeatherData {
    lat: number;
    lon: number;
    name: string;
}
export const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Function to fetch weather forecast data for a country
export const fetchWeatherForecast = async (country: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    return null;
  }
};