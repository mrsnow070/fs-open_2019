const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
    const result = await Blog
        .find({})
        .populate('user', {
            username: 1,
            name: 1
        })
    res.json(result)

})

blogRouter.post('/', async (req, res, next) => {
    const body = req.body;

    const user = await User.findById(body.userId)
    if (!(req.body.title && req.body.url)) {
        res.status(400).send({error:"wrong title or url length"}).end()
    }

    try {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        let savedBlog = await blog.save()
        user.blogs = await user.blogs.concat(savedBlog.id)
        await user.save();
        res.status(201).json(savedBlog);

    } catch (exception) {
        next(exception)
    }





    // if (req.body.title || req.body.url) {
    //     let savedBlog = await blog.save()

    //     // user.blogs = user.blogs.concat(savedBlog._id);

    //     // await user.save();

    // }


})

blogRouter.delete('/:id', async (req, res) => {
    const result = await Blog.findByIdAndRemove(req.params.id);
    res.status(204).json(result).end();
})

blogRouter.put('/:id', async (req, res) => {
    const result = await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    res.status(202).json(result).end();
})

module.exports = blogRouter;