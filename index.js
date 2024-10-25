const express = require("express");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let persons = [
  {
    id: "1",
    name: "Sam",
    age: "26",
    hobbies: [],
  },
]; //This is your in memory database

app.set("db", persons);
//TODO: Implement crud of person

// to retrieve all persons or a single person by ID
app.get("/person/:id?", (req, res) => {
  const { id } = req.params;
  if (id) {
    const person = persons.find((p) => p.id === id);
    return person
      ? res.json(person)
      : res.status(404).json({ error: "Person not found" });
  }
  res.json(persons);
});

// to create a new person
app.post("/person", (req, res) => {
  const { name, age, hobbies } = req.body;
  if (!name || typeof age !== "number" || !Array.isArray(hobbies)) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  const newPerson = { id: uuidv4(), name, age, hobbies };
  persons.push(newPerson);
  res.status(200).json(newPerson);
});

// to update an existing person by ID
app.put("/person/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, hobbies } = req.body;
  const person = persons.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }
  if (!name || typeof age !== "number" || !Array.isArray(hobbies)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  person.name = name;
  person.age = age;
  person.hobbies = hobbies;
  res.json(person);
});

// to delete a person by ID
app.delete("/person/:id", (req, res) => {
  const { id } = req.params;
  const index = persons.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Person not found" });
  }
  persons.splice(index, 1);
  res.status(204).end();
});

// to handle non-existing routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server if running directly

const port = process.env.PORT; // not necessary since it's simple application
if (require.main === module) {
  app.listen(3000, () => console.log("Server is running on port 3000"));
}

module.exports = app;
