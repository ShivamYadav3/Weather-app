const APIkey = "bcdba847c0c2bd6ba79c162ed7fd5853";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [data, setData] = useState({});
  const [code, setCode] = useState(110001);

  const fetchData = async (zipCode) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},IN&appid=${APIkey}`
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
    <div className=" md:mx-24 my-5 flex flex-col justify-center items-center gap-8">
      <div className="text-3xl font-bold">Weather App For India</div>
      <div className="flex  gap-3">
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
        <div className="flex flex-wrap gap-8 justify-center text-base font-semibold">
          {data.list.map((weatherData) => (
            <div
              key={weatherData.dt}
              className="border p-4 rounded-xl bg-gray-200 w-96"
            >
              <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col bg-white rounded gap-3">
                  <div className="font-bold">{data.city.name}</div>
                  <div className="flex gap-8 text-sm text-gray-500 ">
                    <div>{weatherData.dt_txt.split(" ")[0]}</div>
                    <div>
                      {weatherData.dt_txt.split(" ")[1].split(":")[0]}:00
                    </div>
                  </div>
                  {/* <div className="text-3xl inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    
                  </div> */}
                  <div className="flex justify-center items-center text-3xl">
                    <div>
                      {weatherData.weather[0].description
                        .charAt(0)
                        .toUpperCase() +
                        weatherData.weather[0].description.slice(1)}
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="font-medium text-3xl">
                      {(
                        Math.round((weatherData.main.temp - 273.15) * 100) / 100
                      ).toFixed(2)}
                      °C
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="mt-1">
                        <span className="text-sm font-light text-gray-500">
                          Max Temp :
                          {(
                            Math.round(
                              (weatherData.main.temp_max - 273.15) * 100
                            ) / 100
                          ).toFixed(2)}
                          °C
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-light text-gray-500">
                          feels-like :
                          {(
                            Math.round(
                              (weatherData.main.feels_like - 273.15) * 100
                            ) / 100
                          ).toFixed(2)}
                          °C
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full gap-8">
                    <div className="mx-8">
                      <div className="">Wind</div>
                      <div className="text-sm text-gray-500 text-center">
                        {weatherData.wind.speed} k/h
                      </div>
                    </div>
                    <div className="mx-8">
                      <div className="">Humidity</div>
                      <div className="text-sm text-gray-500 text-center ">
                        {weatherData.main.humidity}%
                      </div>
                    </div>
                    <div className="px-8">
                      <div className="">Visibility</div>
                      <div className="text-sm text-gray-500 text-center">
                        {weatherData.visibility / 1000}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
