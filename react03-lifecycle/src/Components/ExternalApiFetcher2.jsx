import { useEffect, useState } from 'react';

const ExternalApiFetcher2 = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    if (!apiKey) {
      setError('VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.');
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&units=metric&lang=kr`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('날씨 데이터를 가져오지 못했습니다.');
        }
        return response.json();
      })
      .then((json) => {
        setWeather(json);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  return (
    <>
      <h2>외부통신2 - 서울 날씨</h2>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <p>도시 : {weather.name}</p>
          <p>날씨 : {weather.weather[0].description}</p>
          <p>기온 : {weather.main.temp}℃</p>
          <p>체감온도 : {weather.main.feels_like}℃</p>
          <p>습도 : {weather.main.humidity}%</p>
        </div>
      )}
    </>
  );
};

export default ExternalApiFetcher2;