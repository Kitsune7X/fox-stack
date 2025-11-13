import { useState } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState([]);

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
        console.log(response.data);
        setCountry(response.data);
      });
  };

  // Initial state, when there is no data then don't fetch it

  // Display the name list

  // ==============================
  // * Function — END
  // ==============================

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">
          find countries
          <input type="text" id="country" />
        </label>
      </form>
      <ul>
        {country.map((b) => (
          <li>{b.name.common}</li>
        ))}
      </ul>
      <button onClick={doStuff}>debug button</button>
    </div>
  );
};

export default App;
