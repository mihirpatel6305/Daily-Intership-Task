function formatForecastData(forecastList) {
  return forecastList.map((item) => {
    const date = new Date(item.dt_txt); 
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    return {
      day,
      temp: item.main.temp,
      icon: item.weather[0].icon,
    };
  });
}

export default formatForecastData;