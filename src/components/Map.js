import React, { useEffect, useRef, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";

const Map = () => {
  const mapRef = useRef(null);
  const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;

  const location = useGeoLocation();

  const latitude = location.coordinates.lat;
  const longitude = location.coordinates.lng;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window;
      if (!mapRef.current || !naver) return;

      const position = new naver.maps.LatLng(latitude, longitude);

      const mapOptions = {
        center: position,
        zoom: 10,
        minZoom: 9,
        scaleControl: false,
        mapDataControl: false,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
      };

      const map = new naver.maps.Map(mapRef.current, mapOptions);

      const markerOptions = {
        position: position,
        map: map,
        icon: {
          url: "./img/pin_default.png",
          size: new naver.maps.Size(22, 35),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(11, 35),
        },
      };

      const marker = new naver.maps.Marker(markerOptions);
    };

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_KEY}`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude, API_KEY]);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.main.temp);
          setWeather(data.weather[0].main);
        })
        .catch((error) => {
          console.log("Error fetching weather data:", error);
        });
    }
  }, [latitude, longitude, url]);

  const mapStyle = {
    width: "100%",
    height: "40vw",
  };

  return (
    <div>
      <div id="map" ref={mapRef} style={mapStyle} />
      <br />
      <h4>현재 날씨</h4>
      {temperature && weather && (
        <div style={{ marginTop: "20px" }}>
          <p>
            온도: {temperature}°C{" "}
            <span style={{ marginLeft: "10px" }}>날씨: {weather}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
