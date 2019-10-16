const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

const checkValidity = (str) => {
    return /\w{3,}/gi.test(str)
}


userRouter.get('/', async (req, res) => {
    const result = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url:1,
    })

    res.json(result.map(u => u.toJSON()));
})

//creating new User
userRouter.post('/', async (req, res, next) => {
    const body = req.body;
    const saltRounds = 10

    if (!(checkValidity(body.username) && checkValidity(body.password))) {
        return res.status(400).send({ error: 'wrong username\'sor password length , min length is 3' })
    }

    try {
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash,
        })

        const savedUser = await user.save()

        res.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }




})

module.exports = userRouter;