import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import actions from '../../../store/actions/actions';
import Header from '../../Header';
import { useHistory } from 'react-router-dom'


export const SingleBlog = ({
    id,
    getBlogs,
    blogs,
    loading,
    like,
    token,
    currentUser,
    removeBlog
}) => {
    const [blog] = blogs.filter(b => b.id === id)
    const history = useHistory();
    let content = <div>loading...</div>

    const deleteHandler = () => {
        removeBlog(token);
        history.push('/');

    }

    useEffect(() => {
        getBlogs()
    }, [getBlogs])

    if (!loading && blog) {
        content = <>
            <Header text={blog.title} />
            <ul className="blog-list">
                <li className="blog-list__item"><a target="_blank" rel="noopener noreferrer" href={blog.url}> {blog.url}</a></li>
                <li className="blog-list__item"> {blog.likes} likes <button onClick={() => like({ likes: blog.likes + 1 })}>like</button> </li>
                <li className="blog-list__item">added by {blog.user.username}</li>
                {currentUser === blog.user.username ?
                    <li className="blog-list__item">
                        <button
                            onClick={deleteHandler}
                        >
                            DELETE
                        </button>
                    </li>
                    : null
                }
            </ul>
        </>
    }

    return (
        <div>
            {content}
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBlogs: () => dispatch(actions.getAll()),
        like: (data) => dispatch(actions.addLike(ownProps.id, data)),
        removeBlog: (token) => dispatch(actions.remove(ownProps.id, token))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.blog.blogs,
        loading: state.blog.loading,
        token: state.auth.data.token,
        currentUser: state.auth.data.username
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);