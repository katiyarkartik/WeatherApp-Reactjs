import React, { useState } from "react";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_BASE,
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };
  const datebuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} , ${date} ${month} ${year}`;
  };
  /*const gettime=(t)=>{
    let time=t.getHours() + ":" + t.getMinutes();
    return `${time}`
  }*/
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 10
            ? "app warm"
            : "app"
          : "app normal"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search City"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>

              <div className="date">{datebuilder(new Date())}</div>
              {/* <div className="time">
         {gettime(new Date())}
       </div>*/}
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
              </div>
              <div className="weather">
                <div className="extra">
                  <div>Pressure:{weather.main.pressure}</div>
                  <div>Humidity:{weather.main.humidity}</div>

                  <div>Min-Temp:{Math.round(weather.main.temp_min)}°C</div>
                  <div>Max-Temp:{Math.round(weather.main.temp_max)}°C</div>
                  {weather.weather[0].main}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="intro">
            <h1>Weather App</h1>
            <p>Get current weather details of any city in the world !!</p>
            <h2>Enter a valid City name</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
