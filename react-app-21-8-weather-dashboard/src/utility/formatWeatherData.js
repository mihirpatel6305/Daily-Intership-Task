function formatWeatherData(weatherData) {
  return {
    city: weatherData?.name,
    icon: weatherData?.weather[0].icon,
    temp: weatherData?.main?.temp,
    weather: weatherData?.weather[0]?.main,
    description: weatherData?.weather[0]?.description,
  };
}

export default formatWeatherData;
