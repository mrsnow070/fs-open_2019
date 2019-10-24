import React from 'react';
import { useField } from '../../hooks/index'
import { connect } from 'react-redux';
import Header from '../Header'
import actions from '../../store/actions/actions';

const BlogForm = ({ createBlog, token, isLoading }) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const sendNewBlog = async (e) => {
        e.preventDefault();
        createBlog({
            title: title.value,
            author: author.value,
            url: url.value
        }, token)

        title.onReset()
        url.onReset()
        author.onReset()
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
                <button
                    disabled={isLoading}
                    type="submit"
                >create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        showNotification: (type, message, timeout) => dispatch(actions.setNotification(type, message, timeout)),
        createBlog: (data, token) => dispatch(actions.createNewBlog(data, token))
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.data.token,
        isLoading: state.blog.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)

