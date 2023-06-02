const currentWeather = () => {
  function onGeoOk(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) =>
        console.log(`온도 : ${data.main.temp}, 날씨 : ${data.weather[0].main}`)
      );
  }

  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }

  const weather = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  return <div>{weather}</div>;
};

export default currentWeather;
