import React from 'react';
import Header from '../Header';
import Blog from './Blog/Blog';
import BlogForm from './BlogForm';
import Toggable from '../../components/Togglable';
import { useResource } from '../../hooks'


export default ({ user, setUser, notificationSetter }) => {
    const [blogs, blogServices] = useResource('/api/blogs');

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
                    blogServices={blogServices}
                />
            </Toggable>
            {
                blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => <Blog
                        blogServices={blogServices}
                        notificationSetter={notificationSetter}
                        blog={blog}
                        key={blog.id} />
                    )}
        </div>
    )
};