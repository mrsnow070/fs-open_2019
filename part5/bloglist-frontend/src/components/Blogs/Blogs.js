import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Blog from './Blog/Blog';
import BlogForm from './BlogForm';
import { getAll as getAllBlogs } from '../../services/blogs';

export default ({ user, setUser, notificationSetter }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        try {
            setBlogs(await getAllBlogs())
        }
        catch (exception) {
            console.log(exception);
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedUser');
        setUser(null);
    }



    return (
        <div>
            <Header text="Blogs" />
            <p>{user} logged in <button onClick={logout}>logout</button></p>
            <BlogForm notificationSetter={notificationSetter} blogs={blogs} blogSetter={setBlogs} />
            {blogs.map(blog => <Blog blog={blog} key={blog.id} />)}
        </div>
    )
};