import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  // console.log(apiKey);

  const [country, setCountry] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [filter, setFilter] = useState([]);
  const [perfectMatch, setPerfectMatch] = useState("");
  const [weather, setWeather] = useState({});

  console.log(newCountry);

  console.log(`perfect: ${perfectMatch}`);
  console.log(filter);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        // console.log(response.data);
        setCountry(response.data);
      });
  }, []);

  // useEffect(() => {
  //   if (!perfectMatch) return;
  //   axios
  //     .get(
  //       `https://studies.cs.helsinki.fi/restcountries/api/name/${perfectMatch}`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setFilter(filter.concat(response.data));
  //       // console.log(response.data.name.common);
  //     });
  // }, [perfectMatch]);

  useEffect(() => {
    // if (!weather) return;
    if (!perfectMatch) return;

    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${perfectMatch}&appid=${apiKey}`
      );
      console.log(data);
    };
    fetchData();
  }, [perfectMatch]);
  // ==============================
  // * Function — START
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Here!");
  };

  // ---------- Search country function ----------
  const search = (term, list) => {
    // if (!newCountry) return;
    // const perfectCell = list.find(
    //   (item) => term.trim().toLowerCase() === item.name.common.toLowerCase()
    // );
    // console.log(perfectCell);

    // if (perfectCell) {
    //   console.log("WTF");
    //   setPerfectMatch(term.trim().toLowerCase());
    //   // setFilter([]);
    //   setFilter(perfectCell);

    //   return perfectCell;
    // } else {
    // setPerfectMatch("");

    const x = list.filter((item) => {
      const re = new RegExp(term.trim().toLowerCase());
      return item.name.common.toLowerCase().search(re) !== -1;
    });
    // console.log(x);
    if (x.length === 1)
      setPerfectMatch(x.reduce((acc, curr) => acc + curr.name.common, ""));
    else setPerfectMatch("");
    setFilter(x);
    // }
  };

  // const c = search(newCountry, country);
  // console.log(`c: ${c}`);
  console.log(perfectMatch);

  // console.log(handleSearchResult(c));
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

      {/* <p>
        <span>debug </span>
        {country.name.common}
      </p> */}
      {/* <button
        onClick={() => {
          setPerfectMatch(`japan`);
        }}
      >
        debug button
      </button> */}
      {/* <div>
        {perfectMatch &&
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
            </div>
          ))}
      </div> */}

      {/* Weather testing  */}
    </div>
  );
};

export default App;

// const languages = {
//   fra: "French",
//   gsw: "Swiss German",
//   ita: "Italian",
//   roh: "Romansh",
// };
// console.log([...languages]);

// console.log(Array.from(languages));
// const arr = Object.entries(languages);
// console.log(arr);
// const m = arr.map(([_, k]) => {
//   return k;
// });

// console.log(m);

// Add button to each list first. When the button is clicked, set perfectMatch status

console.log("" + "test string");

const as = [{ a: "he he", b: "WTF" }];

const lb = as.reduce((acc, curr) => acc + curr.a, "");
console.log(lb);
