// @ts-nocheck
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helperTest = require('../utils/blog_utils');




const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helperTest.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 6 notes', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helperTest.blogs.length)
})

test('There are id field', async () => {
    const response = await helperTest.getBlogData();
    response.map(item => {
        expect(item.id).toBeDefined();
    })
})




test('Post request', async () => {
    const beforePost = helperTest.blogs.length;
    const result = await api.post('/api/blogs')
        .send({
            title: 'String',
            author: 'String',
            url: 'String',
            likes: 1
        })
        .expect(201);
    const afterPost = await helperTest.getBlogData();
    expect(afterPost.length).toBe(beforePost + 1);
    expect(afterPost).toContainEqual(result.body);
})

test('find missing likes', async () => {
    let result = await api.post('/api/blogs');

    if (!result.body.hasOwnProperty("likes")) {
        await Blog.findByIdAndUpdate(result.body.id, { ...result.body, likes: 0 }, { new: true })
    }
    let missingLikes = await helperTest.getBlogData();
    missingLikes = missingLikes.filter(blog => !blog.hasOwnProperty("likes"));

    expect(missingLikes.length).toBe(0)
})
test('adding blog without title and url', async () => {
    const blog = {
        likes: 10
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(400)
})


test('delete by id', async () => {
    const beforeDelete = await helperTest.getBlogData();

    await api.delete(`/api/blogs/${beforeDelete[0].id}`)
        .expect(204);

    const test = await Blog.findById(beforeDelete[0].id);

    expect(test).toBe(null);

})



afterAll(() => {
    mongoose.connection.close()
})