const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

morgan.token('data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return ' '
})
//middlewares
app.use(bodyParser.json());
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

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Doctor",
        "number": "13-2444-234",
        "id": 5
    },
    {
        "name": "New Person 1",
        "number": "123345",
        "id": 6
    },
    {
        "name": "New Person 2",
        "number": "123456234",
        "id": 7
    },
    {
        "name": "New Person 3",
        "number": "13231231",
        "id": 8
    }
]

app.get('/api/persons', (req, res, next) => {
    res.json(persons);
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
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);

    person ? res.json(person)
        : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();

})

app.post('/api/persons', (req, res) => {
    const { body } = req;

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    if (checkValidity(person, persons)) {
        // @ts-ignore
        persons = persons.concat(person);
        res.json(person);

    } else {
        res.status(403)
            .send({ error: 'name or number must be unique' })
            .end();
    }

})


app.listen(3001);