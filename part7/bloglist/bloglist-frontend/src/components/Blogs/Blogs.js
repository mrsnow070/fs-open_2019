import React, { useEffect } from 'react';
import Header from '../Header';
import Blog from './Blog/Blog';
import BlogForm from './BlogForm';
import Toggable from '../../components/Togglable';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';
import LoginForm from '../LoginForm/LoginForm';

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
            <BlogForm
            />
        </Toggable>
        {
            blogs
                .map(
                    blog => <Blog
                        isLoading={loading}
                        blog={blog}
                        key={blog.id} />
                )}
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

