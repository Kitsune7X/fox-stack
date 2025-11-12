import { useState, useEffect } from "react";
import phoneBookService from "./services/phone-book";
import axios from "axios";

const App = () => {
  const [person, setPerson] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState("");

  // Fetch data from server
  useEffect(() => {
    phoneBookService
      .getAll()
      .then((initialContact) => setPerson(initialContact));
  }, []);

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
    // checkExistingName(newName, newNumber, person)
    //   ? showError(newName)
    //   : updateContact(newContact);
    const a = person.find((item) => newName === item.name);
    // console.log(a);
    // console.log(typeof a.number);
    // console.log(typeof newNumber);
    // console.log(checkExistingNumber(newNumber, a.number));
    // console.log(newNumber === a.number);

    if (a && checkExistingNumber(newNumber, a)) {
      showError(newName);
    } else if (a && !checkExistingNumber(newNumber, a)) {
      if (window.confirm(`Do you want to update the number from ${a.name}?`)) {
        const changedNumber = { ...a, number: newNumber };
        axios
          .put(`http://localhost:3001/persons/${a.id}`, changedNumber)
          .then((response) => {
            console.log(response.data);
            const result = response.data;
            setPerson(
              person.map((item) => (item.id === result.id ? result : item))
            );
          });
      } else {
        alert(`No changes to ${a.name} has been made`);
      }
    } else {
      updateContact(newContact);
    }
  };

  // ---------- Existing Name Check function  ----------
  // Use some() to see if the array already contain the contact.
  const checkExistingName = (name, number, list) => {
    const a = list.find((item) => name === item.name);
    console.log(a);
    console.log(a.number);
    console.log(checkExistingNumber(number, a));

    if (a && checkExistingNumber(number, a)) return true;
    else if (a && !checkExistingNumber(number, a))
      console.log("Do you want to update number ?");
    else return false;
  };

  // ---------- Existing Number Check function ----------
  const checkExistingNumber = (number, item) => number === item.number;

  // ---------- Show Error function ----------
  const showError = (name) => alert(`${name} is already added to phone book`);

  // ---------- Update Contact list function ----------
  const updateContact = (newContact) => {
    phoneBookService.create(newContact).then((returnedContact) => {
      setPerson(person.concat(returnedContact));
    });

    // After updating contact list, reset input value
    setNewName("");
    setNewNumber("");
  };

  // ---------- Filter function ----------
  // Using searchTerm, iterate through `person` array of objects
  // For each element in the array, search for a match between `searchTerm`
  // and person's name by using regex and search()
  // If search result is succeed, return new array of filtered person
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

  // ---------- Handle Delete function ----------
  const handleDelete = (name, id) => {
    window.confirm(`Delete ${name}?`) ? erase(id) : alert("( ˶ˆ ᗜ ˆ˵ )");
  };

  // ---------- Delete Contact function ----------
  const erase = (id) => {
    phoneBookService
      .remove(id)
      .then((returnedContact) =>
        setPerson(person.filter((item) => item.id !== returnedContact.id))
      );
  };

  // Update number to existing user
  // If the input name is the same with one of the name of the array
  // then find the id of that object in the array. Pop window.confirm()
  // function and update the data
  // need to take newName as parameter to compare

  // ==============================
  // * Functions — END
  // ==============================

  // ---------- Rendering ----------
  return (
    <div>
      <h2>Phone book</h2>
      {/* Filter section */}
      <Filter term={filter} setTerm={setFilter} />

      {/* Add Contact section */}
      <AddContact onSubmit={addContact}>
        <Field
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required={true}
        >
          name:
        </Field>
        <Field
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          required={true}
        >
          number:
        </Field>
      </AddContact>

      {/* Display Contact section */}
      <h2>Numbers</h2>

      <Display
        contacts={filter ? filterContact(filter, person) : person}
        onClick={handleDelete}
      />
      <button onClick={() => handleDelete()}>debug button</button>
    </div>
  );
};

// ==============================
// * Components — START
// ==============================

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
// https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
const AddContact = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// ---------- Field component ----------
const Field = ({ value, onChange, required, children }) => {
  return (
    <div>
      {children}
      <input value={value} onChange={onChange} required={required} />
    </div>
  );
};

// ---------- Display ----------
const Display = ({ contacts, onClick }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name} {contact.number}
          <button onClick={() => onClick(contact.name, contact.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// ==============================
// * Components — END
// ==============================

export default App;
