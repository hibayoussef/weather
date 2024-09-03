import axios from "axios";

const API_KEY = "your_openweathermap_api_key";

interface WeatherData {
    lat: number;
    lon: number;
    name: string;
}

// Function to fetch humidity data for a country (you can adjust the API call)
export const fetchHumidityData1 = async (lat: number, lon: number) => {
  const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8d06b1764a71cc9ce97e8caffa5f64b1`
  );
  return response.data.main.humidity;
};

export const fetchHumidityData = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8d06b1764a71cc9ce97e8caffa5f64b1`
    );
    return response.data.main.humidity;
  } catch (error) {
    console.error("Error fetching humidity data:", error);
    throw error;
  }
};
