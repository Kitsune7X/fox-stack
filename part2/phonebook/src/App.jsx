import { useState } from "react";
import "./App.css";

const App = () => {
  const [person, setPerson] = useState([
    { id: 1, name: "Arctic Fox", number: "555-0101" },
    { id: 2, name: "Golden Eagle", number: "555-0202" },
    { id: 3, name: "River Otter", number: "555-0303" },
    { id: 4, name: "Coral Seahorse", number: "555-0404" },
    { id: 5, name: "Desert Lynx", number: "555-0505" },
  ]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // ==============================
  // * Functions — START
  // ==============================

  // ---------- Add Contact function ----------
  // When the form get submitted, trigger `addContact` function that
  // create a new object `newContact` storing input value (newName) as
  // value for`name` key and concat it to `person` array
  const addContact = (e) => {
    e.preventDefault();
    // Initialize the contact object that store person info
    const newContact = {
      name: newName,
      number: newNumber,
    };
    // Check for duplicate, then either showing the error or
    // update the contact list
    checkDuplicate(newName, person)
      ? showError(newName)
      : updateContact(newContact);
  };

  // ---------- Duplicate Check function ----------
  // Use some() to see if the array already contain the contact.
  const checkDuplicate = (name, list) =>
    list.some((item) => name === item.name);

  // ---------- Show Error function ----------
  const showError = (name) => alert(`${name} is already added to phonebook`);

  // ---------- Update Contact list function ----------
  const updateContact = (newContact) => {
    // Update the `person` array by concat it `newContact` object
    setPerson(person.concat(newContact));
    // After updating contact list, reset input value
    setNewName("");
    setNewNumber("");
  };

  // ==============================
  // * Functions — END
  // ==============================

  // ---------- Rendering ----------
  return (
    <div>
      <h2>Phonebook</h2>
      <Search term={searchTerm} setTerm={setSearchTerm} />
      <p>debug: {searchTerm}</p>
      <form onSubmit={addContact}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>debug: {newNumber}</p>
      <Display contacts={person} />
    </div>
  );
};

// ==============================
// * Components — START
// ==============================
// ---------- Display ----------
const Display = ({ contacts }) => (
  <ul>
    {contacts.map((contact) => (
      <li key={contact.name}>
        {contact.name} {contact.number}
      </li>
    ))}
  </ul>
);

// ---------- Search field component ----------
const Search = ({ term, setTerm }) => {
  return (
    <div>
      <label>
        filter shown with
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </label>
    </div>
  );
};

// ==============================
// * Components — END
// ==============================

export default App;

// To make the filter, first iterate through
// the array, then for each element search for match with regex
const str = "Arctic Fox";
const re = /e/;
console.log(str.search(re));
