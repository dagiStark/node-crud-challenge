const express = require('express')
const { v4: uuidv4 } = require('uuid'); 

const app = express()
app.use(express.json())  // Middleware to parse JSON bodies

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []    
}] //This is your in memory database



app.set('db', persons)
//TODO: Implement crud of person

// to retrieve all persons or a single person by ID
app.get('/person/:id?', (req, res) => {
    const { id } = req.params;
    if (id) {
        const person = persons.find(p => p.id === id);
        return person ? res.json(person) : res.status(404).json({ error: 'Person not found' });
    }
    res.json(persons);
});


// to create a new person
app.post('/person', (req, res) => {
    const { name, age, hobbies } = req.body;
    if (!name || typeof age !== 'number' || !Array.isArray(hobbies)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const newPerson = { id: uuidv4(), name, age, hobbies };
    persons.push(newPerson);
    res.status(201).json(newPerson);
});






if (require.main === module) {
    app.listen(3000)
}
module.exports = app;