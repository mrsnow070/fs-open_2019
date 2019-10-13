const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app);
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await User.deleteMany({})

})

describe('creating valid/invalid users', () => {

    test('create new valid User', async () => {

        const newUser = {
            username: "It's a valid User",
            name: "String",
            password: "HELLOWORLD",
        }

        await api
            .post('/api/users')
            .expect(201)
            .send(newUser)
    })
    test('try create User with short username, expect statuscode=400', async () => {

        const newUser = {
            username: "It",
            name: "String",
            password: "HELLOWORLD",
        }

        await api
            .post('/api/users')
            .expect(400)
            .send(newUser)
    })
    test('try create User with short password, expect statuscode=400', async () => {

        const newUser = {
            username: "It's",
            name: "String",
            password: "12",
        }

        await api
            .post('/api/users')
            .expect(400)
            .send(newUser)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
