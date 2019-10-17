import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div className='blog'>
        <div className='blog__header'>
            <span className="blog__header-title">{blog.title}</span> <span className="blog__header-author"> {blog.author}</span>
        </div>
        <div className='blog__likes'>
            blog has <span className='blog__likes-count'>{blog.likes}</span> likes
            <button className='blog__likes-button' onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog