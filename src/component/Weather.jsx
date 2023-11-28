const APIkey = "bcdba847c0c2bd6ba79c162ed7fd5853";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [data, setData] = useState({});
  const [code, setCode] = useState(110001);

  const fetchData = async (zipCode) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},IN&appid=${APIkey}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(code);
  }, []);

  const getWeather = () => {
    fetchData(code);
  };

  if (!data.city)
    return (
      <div className="text-3xl font-bold text-center h-[100vh] flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="mx-4 md:mx-24 my-5 flex flex-col justify-center items-center gap-8">
      <div className="text-3xl font-bold">Weather App For India</div>
      <div className="flex flex-col md:flex-row gap-3">
        <div>
          <input
            type="text"
            onChange={(e) => setCode(e.target.value)}
            className="border outline-none rounded-md px-3 h-8 mb-2 md:mb-0"
            placeholder="Enter Zip-Code"
          />
        </div>
        <div>
          <button
            onClick={getWeather}
            className="bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Search
          </button>
        </div>
      </div>
      <div className="text-xl font-semibold">City Name: {data.city.name}</div>
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center text-base font-semibold">
          {data.list.map((weatherData) => (
            <div
              key={weatherData.dt}
              className="border p-4 md:p-6 rounded-xl bg-gray-200"
            >
              <div className="flex gap-2">
                <div>Date: {weatherData.dt_txt.split(" ")[0]}</div>
                <div>
                  Time: {weatherData.dt_txt.split(" ")[1].split(":")[0]}:00
                </div>
              </div>
              <div>
                Temperature:{" "}
                {(
                  Math.round((weatherData.main.temp - 273.15) * 100) / 100
                ).toFixed(2)}
                °C
              </div>
              <div>Humidity: {weatherData.main.humidity}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
