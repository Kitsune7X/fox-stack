import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [perfectMatch, setPerfectMatch] = useState("");
  console.log(newCountry);
  // console.log(country);

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
    if (!newCountry) return;
    return list.filter((item) => {
      const re = new RegExp(term.trim().toLowerCase());
      return item.name.common.toLowerCase().search(re) !== -1;
    });
  };

  const c = search(newCountry, country);
  console.log(c);

  // Need a function to handle the result of search. If
  // ---------- Handle search result function ----------
  const handleSearchResult = (result) => {
    if (!result) return;
    return result.length > 10
      ? `Too many matches, specify another filter`
      : result;
  };

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
            onChange={(e) => setNewCountry(e.target.value)}
          />
        </label>
      </form>
      <button onClick={doStuff}>debug button</button>
      <div>
        {newCountry ? (
          <ul>
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
          </ul>
        ) : (
          ""
        )}
      </div>

      {/* <p>
        <span>debug </span>
        {country.name.common}
      </p> */}
    </div>
  );
};

export default App;

const str = "";
const re = new RegExp(str.trim().toLowerCase());

console.log(re);
