const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((summ, blog) => summ + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favBlog = blogs.reduce((f, curr) => {
        if (f.likes < curr.likes) {
            return {
                title: curr.title,
                author: curr.author,
                likes: curr.likes
            }
        }
        return f
    }, {
        title: "",
        author: "",
        likes: 0
    })
    return favBlog;
}

const mostBlogs = (blogs) => {
    let authors = []
    blogs.map(blog => {
        let count = blogs.filter(bl => {
            return bl.author === blog.author
        }).length
        authors.push({ author: blog.author, blogs: count })
    })

    let reduced = authors.reduce((popular, current) => {
        if (current.blogs > popular.blogs) {
            return {
                author: current.author,
                blogs: current.blogs
            }
        }
        return popular
    }, { name: "", blogs: 0 })

    return reduced;
}

const mostLikes = (blogs) => {
    let authors = []
    blogs.map(blog => {
        let upvote = blogs.filter(bl => {

            return bl.author === blog.author
        })
            .reduce((total, current) => {
                return { author: current.author, likes: total.likes + current.likes }
            }, { author: '', likes: 0 })
        authors.push(upvote)
    })
    authors = authors.sort((a, b) => a.likes - b.likes)
    return authors[authors.length - 1]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}