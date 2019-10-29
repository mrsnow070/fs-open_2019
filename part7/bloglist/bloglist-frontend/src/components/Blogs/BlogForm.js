import React, { useState } from 'react';
import { useField } from '../../hooks/index'
import { connect } from 'react-redux';
import Backdrop from '../hoc/Backdrop';
import actions from '../../store/actions/actions';
import CloseBtn from '../UI/CloseBtn';

const BlogForm = ({ createBlog, token, isLoading }) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const [visible, setVisible] = useState(false)
    let content = <div style={{ margin: '.5rem auto' }} >
        <button onClick={() => setVisible(true)} className="btn">New note</button>
    </div>

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

    const closeHandler = () => {
        setVisible(false);
    }

    if (visible) {

        content = <Backdrop>
            <form className="blog-form" onSubmit={(e) => sendNewBlog(e)}>
                <CloseBtn closeHandler={closeHandler} />
               
                <div className="blog-form__title"><h2>Adding new blog</h2></div>
                <div className="blog-form__group">
                    <input
                        className="blog-form__input"
                        id='title-input'
                        {...title}
                        name="Title"
                        placeholder="Title"
                    />
                    <label
                        className="blog-form__label"
                        htmlFor="title-input"
                    >
                        Title
                    </label>
                </div>
                <div className="blog-form__group">
                    <input
                        className="blog-form__input"
                        placeholder="Author"
                        id='author-input'
                        {...author}
                    />

                    <label
                        className="blog-form__label"
                        htmlFor="author-input"
                    >
                        Author
                    </label>
                </div>
                <div className="blog-form__group">
                    <input
                        className="blog-form__input"
                        id='url-input'
                        placeholder="Url"
                        {...url}
                        name="Url"
                    />
                    <label
                        className="blog-form__label"
                        htmlFor="url-input"
                    >
                        Url
                    </label>
                </div>
                <button
                    className="btn"
                    disabled={isLoading}
                    type="submit"
                >create</button>
                <button
                    className="btn"
                    onClick={() => setVisible(false)}
                    disabled={isLoading}

                >cancel</button>
            </form>
        </Backdrop>
    }

    return (
        <>
            {content}
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

