// @ts-nocheck
const listHelper = require('../utils/list_helper');
const blog_helper = require('../utils/blog_utils');



test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(blog_helper.blogs)
        expect(result).toBe(36)
    })
})

describe('Favorite blog', () => {
    test('Most likes blog', () => {
        const result = listHelper.favoriteBlog(blog_helper.blogs);
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(expected);
    })
})
describe('Most blogs', () => {
    test('Has most blogs count', () => {
        const result = listHelper.mostBlogs(blog_helper.blogs);
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        }
        expect(result).toEqual(expected);
    })
})
describe('Most sum of likes', () => {
    test('Has Most sum of likes', () => {
        const result = listHelper.mostLikes(blog_helper.blogs);
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        expect(result).toEqual(expected);
    })
})

