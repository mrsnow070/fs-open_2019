const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
    const result = await Blog.find({});
    response.json(result)

})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)


    if (request.body.title || request.body.url) {
        let result = await blog.save()
        response.status(201).json(result);
    }

    response.status(400).end()
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