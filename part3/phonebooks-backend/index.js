require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./person');

const app = express();

morgan.token('data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return ' '
})
//middlewares
app.use(bodyParser.json());
app.use(express.static('build'))
app.use(cors());
app.use(morgan(':method :url :status :response-time ms :data'));




const generateId = () => {
    return +(Math.random() * 1000000).toFixed();
}

const checkValidity = (person, arr) => {
    const keys = Object.keys(person)
    const results = [];
    if (person.name.length === 0 || person.number.length === 0) {
        results.push(0)

        return Math.min(...results)
    }
    keys.forEach(key => {
        arr.find(p => {
            if (p[key] === person[key]) {
                results.push(0)
            }
            else {
                results.push(1)
            }
        })
    });

    console.log(person);



    return Math.min(...results)
}



app.get('/api/persons', (req, res, next) => {

    Person.find({}).then(resp => {
        console.log(resp);

        return res.json(resp)

    })
    // res.json(persons);
})


app.get('/info', (req, res) => {
    res.send(
        `
        <p>phonebook has info for ${persons.length} people</p>
        <div>${new Date()}</div>
        
        `
    )
})

app.get('/api/persons/:id', (req, res) => {
console.log(req.params.id);

    Person.findById(req.params.id).then(note => {
        res.json(note.toJSON())
    })

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();

})

app.post('/api/persons', (req, res) => {
    const { body } = req;

    const person = new Person({
        name:body.name,
        number:body.number
    })

    person.save().then(savedPerson=>{
        res.json(savedPerson.toJSON());
    })


   

})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
