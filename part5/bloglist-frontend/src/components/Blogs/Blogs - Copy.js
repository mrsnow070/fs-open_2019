import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Blog from './Blog/Blog';
import BlogForm from './BlogForm';
import { getAll as getAllBlogs } from '../../services/blogs';
import Toggable from '../../components/Togglable';


export default ({ user, setUser, notificationSetter }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        try {
            const response = await getAllBlogs();
            response.sort((a, b) => b.likes - a.likes)
            setBlogs(response)
        }
        catch (exception) {
            console.log(exception);
        }
    }

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedUser');
    }

    return (
        <div>
            <Header text="Blogs" />
            <p>{user} logged in <button onClick={logout}>logout</button></p>
            <Toggable buttonLabel="New note">
                <BlogForm
                    notificationSetter={notificationSetter}
                    updateBlog={getData}
                />
            </Toggable>
            {blogs.map(blog => <Blog
                updateBlogs={getData}
                notificationSetter={notificationSetter}
                blog={blog}
                key={blog.id} />)}
        </div>
    )
};