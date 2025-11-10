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

  const [filter, setFilter] = useState("");

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

  // ---------- Filter function ----------
  // Using searchTerm, iterate through `person` array of objects
  // For each element in the array, search for a match between `searchTerm`
  // and person's name by using regex and search()
  // If search result is succed, return new array of filtered person
  const filterContact = (term, list) => {
    // Filter the `list` array into a new array containing element that match search term
    return list.filter((contact) => {
      // Convert search term to lowercase then use
      // RegEx constructor to make it into a regex
      const re = new RegExp(term.toLowerCase()); // Expected output: /term/
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
      // Convert `contact.name` into all lowercase then
      // search for a match between `re` and the converted string. Anything other than -1 is true
      return contact.name.toLowerCase().search(re) !== -1;
    });
  };

  // ==============================
  // * Functions — END
  // ==============================

  // ---------- Rendering ----------
  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter section */}
      <Filter term={filter} setTerm={setFilter} />

      {/* Add Contact section */}
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
          number:
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

      {/* Display Contact section */}
      <h2>Numbers</h2>
      <Display contacts={filter ? filterContact(filter, person) : person} />
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
      <li key={contact.id}>
        {contact.name} {contact.number}
      </li>
    ))}
  </ul>
);

// ---------- Filter component ----------
const Filter = ({ term, setTerm }) => {
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

// ---------- Add Contact component ----------
// const AddContact = ()

// ==============================
// * Components — END
// ==============================

export default App;
