// src/pages/HumidityMap.tsx

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  fetchWeatherData,
  fetchWeatherForecast
} from "../services/weatherService";
import WeatherCard from "../component/WeatherCard";

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
            radius={humidityData.humidity * 100}
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
