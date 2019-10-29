const commentRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment');
const Blog = require('../models/blog');


commentRouter.post('/', async (req, res) => {
    const { body } = req;
    const token = req.token;

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(decodedToken.id);
        const blog = await Blog.findById(body.blogId)
        // @ts-ignore
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }


        if (!(req.body.comment)) {
            return res.status(400).send({ error: "wrong title or url length" }).end()
        }

        const cmnt = new Comment({
            comment: body.comment,
            date: new Date(),
            // @ts-ignore
            user: {
                userId: user.id,
                username: user.username
            }
        })

        const savedComment = await cmnt.save()
        blog.comments = blog.comments.concat(savedComment.id)
        const result = await blog.save();
        return res.status(201).json(result).end();

    } catch (exception) {
        console.log(exception)
    }



})

commentRouter.post('/annon', async (req, res) => {
    const { body } = req;

    try {
        const cmnt = new Comment({
            comment: body.comment,
            date: new Date(),
            // @ts-ignore
            user: null
        })

        const blog = await Blog.findById(body.blogId);
        const savedComment = await cmnt.save();
        blog.comments = blog.comments.concat(savedComment.id)
        await blog.save();
        res.status(201).end();
    } catch (exception) {
        console.log(exception)
    }
})

commentRouter.get('/', async (req, res) => {
    const result = await Comment.find({})
    res.json(result)
})

module.exports = commentRouter;