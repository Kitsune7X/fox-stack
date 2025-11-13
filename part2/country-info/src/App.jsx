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

  axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => {
      console.log(response.data);
    });

  // Initial state, when there is no data then don't fetch it

  // ==============================
  // * Function — END
  // ==============================

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="country">
        find countries
        <input type="text" id="country" />
      </label>
    </form>
  );
};

export default App;
