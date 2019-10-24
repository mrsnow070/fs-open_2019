import React, { useEffect } from 'react';
import Header from '../Header';
import Blog from './Blog/Blog';
import BlogForm from './BlogForm';
import Toggable from '../../components/Togglable';
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';


const Blogs = ({ user, logoutFn, getAllBlogs, blogs, loading }) => {
    useEffect(() => {
        getAllBlogs()
    }, [getAllBlogs])

    return (
        <div>
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
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.blog.loading,
        blogs: state.blog.blogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBlogs: () => dispatch(actions.getAll())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);

