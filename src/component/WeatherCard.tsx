import styles from "../styles/WeatherCard.module.css";

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
      className={styles.container}
      style={{
        gridTemplateColumns: `150px repeat(${days.length}, 1fr)`,
      }}
    >
      <div></div>
      {days.map((day) => (
        <div key={day} className={styles.dayTitle}>
          {day}
        </div>
      ))}

      <div className={styles.hoursTitle}>Hours</div>
      {days.map((day) => (
        <div key={`hours-${day}`} className={styles.hours}>
          {forecast[day].hours.join(" ")}
        </div>
      ))}

      <div className={styles.hoursTitle}></div>
      {days.map((day) => (
        <div key={`emojis-${day}`} className={styles.emojis}>
          {forecast[day].emojis.join(" ")}
        </div>
      ))}

      <div className={styles.temperatureTitle}>Temperature (°C)</div>
      {days.map((day) => (
        <div key={`temp-${day}`} className={styles.temperatures}>
          {forecast[day].temperatures.join(" ")}
        </div>
      ))}
    </div>
  );
};

export default WeatherCard;
