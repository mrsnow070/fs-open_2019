import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import actions from '../../../store/actions/actions';
import { useHistory } from 'react-router-dom'
import { Comments } from '../Comments/Comments';


export const SingleBlog = ({
    id,
    getBlogs,
    blogs,
    like,
    token,
    currentUser,
    removeBlog,
    addComment
}) => {
    const [blog] = blogs.filter(b => b.id === id)
    const [newComment, setNewComment] = useState('');
    const history = useHistory();
    let content = <div>loading...</div>

    const deleteHandler = () => {
        removeBlog(token);
        history.push('/');
    }

    const addCommentHandler = () => {

        const data = {
            comment: newComment,
            blogId: id
        }
        addComment(data, token);
        setNewComment('');
    }

    useEffect(() => {
        getBlogs()
    }, [getBlogs])

    if (blog) {
        content = <>
            <ul className="blog-list">
                <li className="blog-list__item blog-list__item--title">{blog.title}</li>
                
                <li className="blog-list__item blog-list__item--header">
                    <a target="_blank" rel="noopener noreferrer" href={blog.url}> {blog.url}</a>
                    <span>{blog.likes} likes <button className="btn" onClick={() => like({ likes: blog.likes + 1 })}>Upvote</button> </span>
                </li>
                <li className="blog-list__item blog-list__item--creator">added by {blog.user.username}
                    {currentUser === blog.user.username ?

                        <button className="btn" onClick={deleteHandler}>
                            delete
                        </button>
                        : null
                    }
                </li>
            </ul>
            <Comments comments={blog.comments} blogId={blog.id} />
            <div className="comment-add">
                <div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="comment-add__text-area"
                    />
                </div>
                <button onClick={addCommentHandler} className="btn">comment</button>
            </div>
        </>
    }

    return (
        <div className="blog">
            {content}
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBlogs: () => dispatch(actions.getAll()),
        like: (data) => dispatch(actions.addLike(ownProps.id, data)),
        removeBlog: (token) => dispatch(actions.remove(ownProps.id, token)),
        addComment: (data, token) => dispatch(actions.addComment(data, token))
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blog.blogs,
        loading: state.blog.loading,
        token: state.auth.data.token,
        currentUser: state.auth.data.username
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);