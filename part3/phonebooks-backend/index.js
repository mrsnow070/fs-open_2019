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
app.use(express.static('build'))
app.use(bodyParser.json());
app.use(morgan(':method :url :status :response-time ms :data'));
app.use(cors());









app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
            res.json(person.toJSON())
        })
        .catch(error => {
            next(error)
        })

})

app.get('/api/persons', (req, res, next) => {

    Person.find({}).then(resp => {
        return res.json(resp)

    })
})

app.delete('/api/persons/:id', (req, res) => {

    Person.findByIdAndRemove(req.params.id).then(result => {

        res.json(result).status(204).end();
    })

})

app.get('/info', (req, res) => {

    Person.find({}).then(result => {
        res.send(
            `
        <p>phonebook has info for ${result.length} people</p>
        <div>${new Date()}</div>
        `
        )
    })

})

app.post('/api/persons', (req, res, next) => {
    const { body } = req;

    const person = new Person({
        name: body.name,
        number: body.number
    })


    person.save()
        .then(savedPerson => {
            res.json(savedPerson.toJSON());
        })
        .catch(error => {

            next(error)
        })

})

app.put('/api/persons/:id', (req, res, next) => {

    const body = req.body;


    if (body.number < 10000000) {
        res.status(400).json({ error: 'Wrong number length' })
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(result => res.json(result))

})

const errorHandler = (error, request, response, next) => {
    console.log(error.name);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
