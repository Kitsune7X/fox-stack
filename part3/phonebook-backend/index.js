const express = require('express');
const app = express();
app.use(express.json());

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

// ---------- Root entry ----------
app.get('/', (request, response) => {
  response.send('<h1>Hello!</h1>');
});

// ---------- Get Data ----------
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// ---------- General info ----------
app.get('/info', (request, response) => {
  const timestamp = new Date().toString();
  const count = persons.length;
  //   console.log(count);

  response.send(`
                <p>Phone book has info of ${count} people</p>
                <p>${timestamp}</p>
                `);
});

// ---------- Display the information for a single phone book entry ----------
app.get('/api/persons/:id', (request, response) => {
  //https://expressjs.com/en/5x/api.html#req.params
  const id = request.params.id;
  const person = persons.find((z) => z.id === id);

  if (!person)
    return response.status(404).json({ error: 'NOT FOUND' });
  else response.json(person);
});

// ---------- Delete a single phone book entry ----------
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  // Filter out the list
  persons = persons.filter((z) => z.id !== id);
  res.status(204).end();
});

// ---------- Add new entries ----------
const generateId = () =>
  String(Math.floor(Math.random() * Date.now()));

app.post('/api/persons', (req, res) => {
  console.log(req.body);
  const body = req.body;
  if (!body)
    return res.status(400).json({ error: 'CONTENT MISSING.' });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
