import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [filter, setFilter] = useState([]);
  const [perfectMatch, setPerfectMatch] = useState("");
  // const [fuck, setFuck] = useState({});
  console.log(newCountry);
  // console.log(country);
  console.log(`perfect: ${perfectMatch}`);
  console.log(filter);
  // console.log(`fuck: ${fuck}`);

  useEffect(() => {
    axios
      .get(
        // `https://studies.cs.helsinki.fi/restcountries/api/name/${newCountry}`
        `https://studies.cs.helsinki.fi/restcountries/api/all`
      )
      .then((response) => {
        // console.log(response.data);
        setCountry(response.data);
      });
  }, []);

  useEffect(() => {
    if (perfectMatch) {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${perfectMatch}`
        )
        .then(
          (response) => {
            console.log(response.data);
            // setFilter(filter.concat(response.data));
          },
          [perfectMatch]
        );
    }
  });

  // ==============================
  // * Function — START
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Here!");
  };

  const doStuff = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        // console.log(response.data);
        setCountry(response.data);
      });
  };

  // ---------- Search country function ----------
  const search = (term, list) => {
    // if (!newCountry) return;
    const perfectCell = list.find(
      (item) => term.trim().toLowerCase() === item.name.common.toLowerCase()
    );
    console.log(perfectCell);

    if (perfectCell) {
      console.log("WTF");
      setPerfectMatch(term.trim().toLowerCase());
      // setFilter([]);
      setFilter(perfectCell);

      return perfectCell;
    } else {
      setPerfectMatch("");

      const x = list.filter((item) => {
        const re = new RegExp(term.trim().toLowerCase());
        return item.name.common.toLowerCase().search(re) !== -1;
      });
      console.log(x);

      setFilter(x);
    }
  };

  // const c = search(newCountry, country);
  // console.log(`c: ${c}`);
  console.log(perfectMatch);

  // if (c.length === 1) console.log("WTF!");

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
      <button onClick={doStuff}>debug button</button>
      <div>
        {/* {perfectMatch ? <span>WTF</span> : ""} */}
        {/* <ul>
          {newCountry ? (
            search(newCountry, country).length <= 10 ? (
              search(newCountry, country).map((item) => (
                <li>{item.name.common}</li>
              ))
            ) : (
              <span>Too many matches, specify another</span>
            )
          ) : (
            ""
          )}
        </ul> */}
      </div>

      {/* <p>
        <span>debug </span>
        {country.name.common}
      </p> */}
    </div>
  );
};

export default App;
