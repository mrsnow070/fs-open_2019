const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
    const result = await Blog
        .find({})
        .populate('user', {
            username: 1,
            name: 1
        }).populate('comments', {
            comment: 1,
            date: 1,
            likes: 1,
            user: 1
        })
    res.json(result)

})

blogRouter.post('/', async (req, res, next) => {
    const body = req.body;

    const token = req.token;

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id);

        if (!(req.body.title && req.body.url)) {
            return res.status(400).send({ error: "wrong title or url length" }).end()
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user.id
        })
        let savedBlog = await blog.save()
        user.blogs = await user.blogs.concat(savedBlog.id)
        await user.save();
        res.status(201).json(savedBlog);

    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (req, res, next) => {
    // const body = req.body;
    const token = req.token;
    const deletingId = req.params.id;

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }


        const creatorId = await Blog.findById(deletingId)

        if (decodedToken.id === creatorId.user.toString()) {
            const result = await Blog.findByIdAndRemove(req.params.id);
            const user = await User.findById(decodedToken.id);
            user.blogs = user.blogs.filter(item => item.toString() !== deletingId)

            user.save();
            res.status(204).json(result).end();
        } else {
            res.status(401).json({ error: 'Wrong token' }).end();
        }
    } catch (exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (req, res) => {
    const result = await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    res.status(202).json(result).end();
})

module.exports = blogRouter;