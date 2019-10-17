import React, { useState, useEffect } from 'react';
import Header from '../Header'
import { create, setToken } from '../../services/blogs';

const BlogForm = ({ updateBlog, notificationSetter }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setToken(user.token);
        }
    }, [])


    const handleInput = (e, setter) => {
        setter(e.target.value)
    }

    const sendNewBlog = async (e) => {
        e.preventDefault();

        try {
            const result = await create({ title, author, url, });
            await updateBlog();
            notificationSetter({
                type: 'notification',
                message: `New blog ${result.data.title} by ${result.data.author} added`
            })
        } catch (exception) {
            notificationSetter({
                type: 'error',
                message: exception.response.data.error
            })
        }
    }

    return (
        <>
            <Header text="create new" />
            <form onSubmit={(e) => sendNewBlog(e)}>
                <div>
                    title: <input
                        type="text"
                        onChange={(e) => handleInput(e, setTitle)}
                        value={title}
                        name="Title" />
                </div>
                <div>
                    author: <input
                        type="text"
                        onChange={(e) => handleInput(e, setAuthor)}
                        value={author}
                        name="Author" />
                </div>
                <div>
                    url: <input
                        type="text"
                        onChange={(e) => handleInput(e, setUrl)}
                        value={url}
                        name="Url" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default BlogForm;