const express = require('express');
const app = express();

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// Test endpoint
app.get('/', (request, response) => {
  response.send('<h1>Hello!</h1>');
});

// Get data
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// Showing info
app.get('/info', (request, response) => {
  const timestamp = new Date().toString();
  const count = persons.length;
  //   console.log(count);

  response.send(`
                <p>Phone book has info of ${count} people</p>
                <p>${timestamp}</p>
                `);
});

// Display the information for a single phone book entry
// If an entry for the given id is not found, the server
//  has to respond with the appropriate status code.
// Get the correct route first
app.get('/api/persons/:id', (request, response) => {
  //https://expressjs.com/en/5x/api.html#req.params
  console.log(`id: ${id}`);
  const person = persons.find((z) => z.id === id);

  if (!person)
    return response.status(404).json({ error: 'NOT FOUND' });
  else response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
