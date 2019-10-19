import React, { useState, useEffect } from 'react';
import { useField } from '../../hooks'
import Header from '../Header'

const BlogForm = ({ blogServices, notificationSetter }) => {
    const [token, setToken] = useState(null);
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setToken(user.token);
        }
    }, [])

    const sendNewBlog = async (e) => {
        e.preventDefault();

        try {
            const result = await blogServices.create({
                title: title.value,
                author: author.value,
                url: url.value
            }, token);
            title.onReset()
            url.onReset()
            author.onReset()
            await blogServices.getAll();
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
                        {...title}
                        name="Title" />
                </div>
                <div>
                    author: <input
                        {...author}
                        name="Author" />
                </div>
                <div>
                    url: <input
                        {...url}
                        name="Url" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default BlogForm;