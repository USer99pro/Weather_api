// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import citiesData from './citiesData';
// import './styles.css';

// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [defaultCitiesWeather, setDefaultCitiesWeather] = useState([]);
//   const [error, setError] = useState('');

//   const fetchWeather = async (city) => {
//     const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       return {
//         city: response.data.name,
//         temperature: response.data.main.temp,
//         description: response.data.weather[0].description,
//         humidity: response.data.main.humidity,
//         icon: response.data.weather[0].icon, // เพิ่มการดึงไอคอน
//       };
//     } catch (err) {
//       console.error(`Error fetching weather data for ${city}:`, err.message);
//       return null;
//     }
//   };

//   const fetchDefaultCitiesWeather = async () => {
//     const citiesWeather = await Promise.all(
//       citiesData.map((city) => fetchWeather(city))
//     );
//     setDefaultCitiesWeather(citiesWeather.filter(Boolean));
//   };

//   const handleSearch = async () => {
//     if (!city) return;
//     const weatherData = await fetchWeather(city);
//     if (weatherData) {
//       setWeather(weatherData);
//       setError('');
//     } else {
//       setError('ไม่พบข้อมูลอากาศของเมืองนี้');
//       setWeather(null);
//     }
//   };

//   useEffect(() => {
//     fetchDefaultCitiesWeather();
//   }, []);

//   return (
//     <div className="container">
//       <div className="navbar">
//         <h1>Weather App</h1>
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="ค้นหาเมือง"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="input"
//           />
//           <button onClick={handleSearch} className="button">
//             ค้นหา
//           </button>
//         </div>
//       </div>

//       {error && <p className="error">{error}</p>}

//       {weather && (
//         <div className="card">
//           <div className="background">
//             {/* ใช้ไอคอนหรือภาพตามข้อมูลที่ได้จาก API */}
//             <img
//               src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
//               alt={weather.description}
//               className="icon"
//             />
//           </div>
//           <div className="info">
//             <h3>{weather.city}</h3>
//             <p>อุณหภูมิ: {weather.temperature}°C</p>
//             <p>ความชื้น: {weather.humidity}%</p>
//             <p>สภาพอากาศ: {weather.description}</p>
//           </div>
//         </div>
//       )}

//       <div className="default-cities">
//         <h2 className="default-cities-header">ข้อมูลอากาศเมืองเริ่มต้น</h2>
//         <div className="grid">
//           {defaultCitiesWeather.map((cityWeather, index) => (
//             <div key={index} className="card">
//               <div className="background">
//                 {/* ใส่ภาพพื้นหลังหรือไอคอน */}
//                 <img
//                   src={`https://openweathermap.org/img/wn/${cityWeather.icon}.png`}
//                   alt={cityWeather.description}
//                   className="icon"
//                 />
//               </div>
//               <div className="info">
//                 <h3>{cityWeather.city}</h3>
//                 <p>อุณหภูมิ: {cityWeather.temperature}°C</p>
//                 <p>ความชื้น: {cityWeather.humidity}%</p>
//                 <p>สภาพอากาศ: {cityWeather.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Weather;

//**************** React + tailwindcss ***********************

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
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      return {
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        icon: response.data.weather[0].icon, // ไอคอนของสภาพอากาศ
      };
    } catch (err) {
      console.error(`Error fetching weather data for ${city}:`, err.message);
      return null;
    }
  };

  const fetchDefaultCitiesWeather = async () => {
    const citiesWeather = await Promise.all(
      citiesData.map((city) => fetchWeather(city))
    );
    setDefaultCitiesWeather(citiesWeather.filter(Boolean));
  };

  const handleSearch = async () => {
    if (!city) return;
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      setWeather(weatherData);
      setError("");
    } else {
      setError("ไม่พบข้อมูลอากาศของเมืองนี้");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchDefaultCitiesWeather();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#29a0b1]">
      <div className="container mx-auto p-4">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6 bg-[#167d7f] p-4 rounded-lg shadow-md">
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
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6">
            <p className="font-semibold">เกิดข้อผิดพลาด:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Searched City */}
        {weather && (
          <div className="card bg-[#fff9e3] rounded-lg shadow-md overflow-hidden mb-6 mx-auto max-w-md">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://openweathermap.org/img/wn/${weather.icon}@2x.png)`,
              }}
            ></div>
            <div className="p-4 text-center ">
              <h3 className="text-xl font-bold">{weather.city}</h3>
              <p className="text-sm">อุณหภูมิ: {weather.temperature}°C</p>
              <p className="text-sm">ความชื้น: {weather.humidity}%</p>
              <p className="text-sm ">สภาพอากาศ: {weather.description}</p>
            </div>
          </div>
        )}

        {/* Default Cities */}
        <div>
          <h2 className="text-xl font-bold text-center mb-4 ">
            ข้อมูลอากาศเมืองเริ่มต้น
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 ">
            {defaultCitiesWeather.map((cityWeather, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div
                  className="h-32 bg-cover bg-center "
                  style={{
                    backgroundImage: `url(https://openweathermap.org/img/wn/${cityWeather.icon}@2x.png)`,
                  }}
                ></div>
                <div className="p-4  bg-[#5ac4a0] text-white ">
                  <h3 className="text-lg font-bold text-center">
                    เมือง: {cityWeather.city}
                  </h3>
                  <p className="text-base-content">
                    อุณหภูมิ: {cityWeather.temperature}°C
                  </p>
                  <p className="text-base-content ">
                    ความชื้น: {cityWeather.humidity}%
                  </p>
                  <p className="text-base-content ">
                    สภาพอากาศ: {cityWeather.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
