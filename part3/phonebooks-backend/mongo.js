const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]


const url =
    `mongodb+srv://mrSnow070:${password}@fsopen2019-bgood.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: 'New Person - 2',
    number: "33-44-55-68",
})

// person.save().then(response => {
//     console.log('person added!', this)
//     mongoose.connection.close()
// })

// Person.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })
switch (process.argv.length) {
    case 3:
        Person.find({}).then(result => {
            console.warn('Phonebook:');
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            
            mongoose.connection.close();
        })
        break;

    case 5:
        new Person({
            name: process.argv[3],
            number: process.argv[4],
        })
            .save()
            .then(resp => {
                // @ts-ignore
                console.log(`added ${resp.name} number: ${resp.number}`);
                mongoose.connection.close()
            })

    default: console.log('Default case');
    
        break;
}


