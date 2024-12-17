import { useState, useEffect } from "react";
import axios from "axios";
import citiesData from "./citiesData";
import "../index.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [defaultCitiesWeather, setDefaultCitiesWeather] = useState([]);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // ตรวจสอบ API KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      return {
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        icon: response.data.weather[0].icon,
      };
    } catch (err) {
      console.error(`Error fetching weather data for ${city}:`, err.message);
      return null; // ส่งค่า null กลับไปหากมีปัญหา
    }
  };

  const fetchDefaultCitiesWeather = async () => {
    const citiesWeather = await Promise.all(
      citiesData.map((city) => fetchWeather(city))
    );
    setDefaultCitiesWeather(citiesWeather.filter(Boolean)); // ลบข้อมูลที่เป็น null ออก
  };

  const handleSearch = async () => {
    if (!city) return; // ไม่ทำงานถ้าไม่กรอกชื่อเมือง
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      setWeather(weatherData);
      setError(""); // รีเซ็ต Error
    } else {
      setError("ไม่พบข้อมูลอากาศของเมืองนี้");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchDefaultCitiesWeather();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center bg-[url('./qQa5Pd7-weather-wallpapers.jpg')] mx-auto bg-no-repeat">
      <div className="container mx-auto p-4">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-white/20 to-white/5 backdrop-blur-md p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-white">Weather App</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="ค้นหาเมือง"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-lg shadow hover:bg-blue-100"
            >
              ค้นหา
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 mb-4">
            {error}
          </div>
        )}

        {/* แสดงสภาพอากาศเมื่อค้นหา */}
        {weather && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
            <div
              className="w-20 h-20 mx-auto bg-no-repeat bg-center bg-contain blur-[10%] backdrop-blur-[10px]"
              style={{
                backgroundImage: `url(https://openweathermap.org/img/wn/${weather.icon}@2x.png)`,
              }}
            ></div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold mb-2">เมือง: {weather.city}</h3>
              <p>อุณหภูมิ: {weather.temperature}°C</p>
              <p>ความชื้น: {weather.humidity}%</p>
              <p>สภาพอากาศ: {weather.description}</p>
            </div>
          </div>
        )}

        {/* Default Cities */}
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          ข้อมูลอากาศเมือง
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 m-9">
          {defaultCitiesWeather.map((cityWeather, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden">
              <div>
                <div
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto bg-no-repeat bg-center bg-contain"
                  style={{
                    backgroundImage: `url(https://openweathermap.org/img/wn/${cityWeather.icon}@2x.png)`,
                  }}
                ></div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold text-center">
                  เมือง: {cityWeather.city}
                </h3>
                <p>อุณหภูมิ: {cityWeather.temperature}°C</p>
                <p>ความชื้น: {cityWeather.humidity}%</p>
                <p>สภาพอากาศ: {cityWeather.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
