import React, { useEffect } from 'react';
import Header from '../Header';
import BlogForm from './BlogForm';
import Toggable from '../../components/Togglable';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';
import LoginForm from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom'

const Blogs = ({
    user,
    logoutFn,
    getAllBlogs,
    blogs,
    loading,
    isAuth
}) => {
    useEffect(() => {
        getAllBlogs()
    }, [getAllBlogs])

    let content = <div>
        <Header text="Blogs" />
        <p>{user} logged in <button onClick={logoutFn}>logout</button></p>
        <Toggable buttonLabel="New note">
            <BlogForm />
        </Toggable>
        <ul className="blog-list">
            {
                blogs
                    .map(blog =>
                        <li key={blog.id} className="blog-list__item">
                            <Link className="blog-list__item--link" to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </Link>
                        </li>

                    )}
        </ul>
    </div>

    return (
        <div>
            {isAuth ? content : <LoginForm />}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.blog.loading,
        blogs: state.blog.blogs,
        user: state.auth.data.name,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBlogs: () => dispatch(actions.getAll()),
        logoutFn: () => dispatch(actions.authLogout())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);

