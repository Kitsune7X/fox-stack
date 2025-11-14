import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [country, setCountry] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [filter, setFilter] = useState([]);
  const [perfectMatch, setPerfectMatch] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");

  console.log(newCountry);

  console.log(`perfect: ${perfectMatch}`);
  console.log(filter);
  console.log(weather);
  console.log(weatherIcon);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountry(response.data);
      });
  }, []);

  useEffect(() => {
    if (!perfectMatch) return;

    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${perfectMatch}&appid=${apiKey}`
      );

      setWeather(data);
      setWeatherIcon(data.weather.reduce((acc, curr) => acc + curr.icon, ""));
    };
    fetchData();
  }, [perfectMatch]);
  // ==============================
  // * Function — START
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // ---------- Search country function ----------
  const search = (term, list) => {
    const x = list.filter((item) => {
      const re = new RegExp(term.trim().toLowerCase());
      return item.name.common.toLowerCase().search(re) !== -1;
    });
    if (x.length === 1)
      setPerfectMatch(x.reduce((acc, curr) => acc + curr.name.common, ""));
    else setPerfectMatch("");
    setFilter(x);
  };

  // ==============================
  // * Function — END
  // ==============================

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">
          find countries
          <input
            type="text"
            id="country"
            value={newCountry}
            onChange={(e) => {
              setNewCountry(e.target.value);
              search(e.target.value, country);
            }}
          />
        </label>
      </form>

      <div>
        {newCountry ? (
          perfectMatch ? (
            filter.map((item) => (
              <div key={item.name}>
                <h1>{item.name.common}</h1>
                <p>Capital: {item.capital}</p>
                <p>Area: {item.area}</p>
                <h2>Languages</h2>
                <ul>
                  {Object.entries(item.languages).map(([_, lang]) => (
                    <li key={_}>{lang}</li>
                  ))}
                </ul>
                <div>
                  <img src={item.flags.svg} alt={item.flags.alt} width={150} />
                </div>
                <div>
                  <h2>Weather in {item.capital}</h2>
                  <p>Temperature: {weather?.main?.temp}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt="weather condition image"
                  />
                  <p>Wind: {weather?.wind?.speed} m/s</p>
                </div>
              </div>
            ))
          ) : filter.length > 10 ? (
            <span>Too many matches, specify another filter</span>
          ) : (
            <ul>
              {filter.map((item) => (
                <li key={item.name.common}>
                  {item.name.common}
                  <button
                    onClick={() => {
                      setPerfectMatch(item.name.common);
                      setFilter(
                        filter.filter((z) => z.name.common === item.name.common)
                      );
                    }}
                  >
                    show
                  </button>
                </li>
              ))}
            </ul>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
