import { useState, useEffect } from "react";
import phoneBookService from "./services/phone-book";
import Notification from "./components/Notification";
// import axios from "axios";

const App = () => {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  // Fetch data from server
  useEffect(() => {
    phoneBookService
      .getAll()
      .then((initialContact) => setPerson(initialContact));
  }, []);

  // ==============================
  // * Functions — START
  // ==============================

  // ---------- Handle Notification ----------
  const handleNotification = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  // ---------- Add Contact function ----------
  // When the form get submitted, trigger `addContact` function that
  // create a new object `newContact` storing input value (newName) as
  // value for`name` key and concat it to `person` array
  const addContact = (e) => {
    e.preventDefault();

    // Check for matching name in the database. If there is a match,
    // check if the number also matches. If both match, show error, otherwise, ask
    // user if they want to update the number
    // If none matches, add new contact to database
    const matched = person.find((item) => newName === item.name);

    if (matched && matchNumber(newNumber, matched.number))
      handleNotification(`${newName} is already added to phone book.`);
    else if (matched && !matchNumber(newNumber, matched.number)) {
      if (
        window.confirm(
          `${matched.name} is already added to phone book, replace the old number with new one?`
        )
      ) {
        const changedNumber = { ...matched, number: newNumber }; // Use spread to make a copy of `matched` then update `number` property

        phoneBookService
          .updateNumber(matched.id, changedNumber)
          .then((returnedContact) => {
            setPerson(
              person.map((item) =>
                item.id === returnedContact.id ? returnedContact : item
              )
            );
            handleNotification(`${returnedContact.name}'s Number was updated.`);
            // Keep this off during testing for convenience
            // setNewName("");
            // setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
          });
      } else handleNotification(`No changes to ${matched.name} has been made.`);
    } else {
      // Initialize the contact object that store person info
      const newContact = {
        name: newName,
        number: newNumber,
      };
      updateContact(newContact);

      handleNotification(`${newName} was added to Contact list`);
    }
  };

  // ---------- Existing Number Check function ----------
  const matchNumber = (number1, number2) => number1 === number2;

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
    window.confirm(`Delete ${name}?`)
      ? erase(id)
      : handleNotification(`♡( ◡‿◡ )`);
  };

  // ---------- Delete Contact function ----------
  const erase = (id) => {
    phoneBookService.remove(id).then((returnedContact) => {
      setPerson(person.filter((item) => item.id !== returnedContact.id));
      handleNotification(
        `${returnedContact.name} was deleted from Contact list.`
      );
    });
  };

  // ==============================
  // * Functions — END
  // ==============================

  // ---------- Rendering ----------
  return (
    <div>
      <h2>Phone book</h2>
      <Notification message={message} />
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
      {/* <button onClick={() => handleDelete()}>debug button</button> */}
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
    <ul className="contact-list">
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
