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
            likes: body.likes || 0,
            // @ts-ignore
            user: {
                userId: user.id,
                username: user.username
            }
        })
        if (body.sub !== undefined) {
            let comment = await Comment.findById(body.sub.comment_id)
            const savedComment = await cmnt.save()
            comment.subComment = comment.subComment.concat(savedComment.id);
            const result = await comment.save();
            console.log(result)
            return res.status(201).json(result).end();

        } else {
            const savedComment = await cmnt.save()
            blog.comments = blog.comments.concat(savedComment.id)
            const result = await blog.save();
            return res.status(201).json(result).end();

        }


    } catch (exception) {
        console.log(exception)
    }



})

commentRouter.get('/', async (req, res) => {
    const result = await Comment.find({}).populate('subComment', {
        comment: 1,
        date: 1,
        likes: 1,
        user: 1
    })
    res.json(result)
})

module.exports = commentRouter;