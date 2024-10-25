const express = require('express')
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




if (require.main === module) {
    app.listen(3000)
}
module.exports = app;