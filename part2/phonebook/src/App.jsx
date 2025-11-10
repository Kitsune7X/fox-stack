import { useState } from "react";
import "./App.css";

const App = () => {
  const [person, setPerson] = useState([
    { name: "Arto Hellas" },
    { name: "Test" },
  ]);

  const [newName, setNewName] = useState("");

  // Set input value to newName and update input value on change
  // with setNewName

  // Add event handler to button. When button is clicked, concat the
  // current value to `person` array

  // Make the app display the person too
  const handleClick = () => {
    // Initialize the contact object that store person info
    const newContact = {
      name: newName,
    };
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
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
      <li>{contact.name}</li>
    ))}
  </ul>
);

// ==============================
// * Components — END
// ==============================

export default App;
