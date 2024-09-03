import axios from "axios";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY = "8d06b1764a71cc9ce97e8caffa5f64b1";

// Function to fetch weather data for a given latitude and longitude
const fetchWeatherData = async (lat: number, lon: number) => {
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
const fetchWeatherForecast = async (country: string) => {
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
const WeatherCard = ({ weatherData }: any) => {
  if (!weatherData || !weatherData.list) return <p>No data available</p>;

  // Extract forecast data
  const forecast = weatherData.list.reduce((acc: any, item: any) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const hour = date.getHours();

    if (!acc[day]) {
      acc[day] = { hours: [], temperatures: [], emojis: [] };
    }

    acc[day].hours.push(hour);
    acc[day].temperatures.push(`${Math.round(item.main.temp - 273.15)}°`);
    acc[day].emojis.push(
      item.weather[0].main === "Clear"
        ? "☀️"
        : item.weather[0].main === "Clouds"
        ? "☁️"
        : item.weather[0].main === "Rain"
        ? "🌧️"
        : "❓"
    );
    return acc;
  }, {});

  // Get unique days for column headers
  const days = Object.keys(forecast);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "#fff",
        zIndex: 1000,
        display: "grid",
        gridTemplateColumns: `150px repeat(${days.length}, 1fr)`,
        gap: "10px",
        overflowX: "auto",
        boxSizing: "border-box",
      }}
    >
      {/* Header for the first column */}
      <div></div>
      {days.map((day) => (
        <div key={day} style={{ textAlign: "center", fontWeight: "bold" }}>
          {day}
        </div>
      ))}

      {/* Header for the "Hours" row */}
      <div style={{ textAlign: "center", fontWeight: "bold" }}>Hours</div>
      {days.map((day) => (
        <div
          key={`hours-${day}`}
          style={{ textAlign: "center", whiteSpace: "nowrap" }}
        >
          {forecast[day].hours.join(" ")}
        </div>
      ))}

      {/* Header for the "Emojis" row */}
      <div style={{ textAlign: "center", fontWeight: "bold" }}></div>
      {days.map((day) => (
        <div
          key={`emojis-${day}`}
          style={{ textAlign: "center", whiteSpace: "nowrap" }}
        >
          {forecast[day].emojis.join(" ")}
        </div>
      ))}

      {/* Header for the "Temperature" row */}
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        Temperature (°C)
      </div>
      {days.map((day) => (
        <div
          key={`temp-${day}`}
          style={{ textAlign: "center", whiteSpace: "nowrap" }}
        >
          {forecast[day].temperatures.join(" ")}
        </div>
      ))}
    </div>
  );
};


const HumidityMap = () => {
  const [humidityData, setHumidityData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (event) => {
        const { lat, lng } = event.latlng;
        const weather = await fetchWeatherData(lat, lng);
        if (weather) {
          setHumidityData({
            lat,
            lon: lng,
            humidity: weather.main.humidity,
            name: `Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`,
          });
        }
      },
    });
    return null;
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const country = (event.target as any).country.value;
    const forecast = await fetchWeatherForecast(country);
    setWeatherData(forecast);
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ padding: "10px" }}>
        <input type="text" name="country" placeholder="Search for a country" />
        <button type="submit">Search</button>
      </form>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {humidityData && (
          <Circle
            center={[humidityData.lat, humidityData.lon]}
            radius={humidityData.humidity * 100} // Adjust radius based on humidity
            color="blue"
            fillColor="blue"
            fillOpacity={0.5}
          >
            <Popup>
              <strong>{humidityData.name}</strong>
              <br />
              Humidity: {humidityData.humidity}%
            </Popup>
          </Circle>
        )}
      </MapContainer>
      <WeatherCard weatherData={weatherData} />
    </div>
  );
};

export default HumidityMap;
