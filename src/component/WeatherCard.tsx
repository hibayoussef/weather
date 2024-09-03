// src/components/WeatherCard.tsx

import React from "react";

const WeatherCard = ({ weatherData }: any) => {
  if (!weatherData || !weatherData.list) return <p>No data available</p>;

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
      <div></div>
      {days.map((day) => (
        <div key={day} style={{ textAlign: "center", fontWeight: "bold" }}>
          {day}
        </div>
      ))}

      <div style={{ textAlign: "center", fontWeight: "bold" }}>Hours</div>
      {days.map((day) => (
        <div
          key={`hours-${day}`}
          style={{ textAlign: "center", whiteSpace: "nowrap" }}
        >
          {forecast[day].hours.join(" ")}
        </div>
      ))}

      <div style={{ textAlign: "center", fontWeight: "bold" }}></div>
      {days.map((day) => (
        <div
          key={`emojis-${day}`}
          style={{ textAlign: "center", whiteSpace: "nowrap" }}
        >
          {forecast[day].emojis.join(" ")}
        </div>
      ))}

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

export default WeatherCard;
