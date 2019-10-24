import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../store/actions/actions';


const Blog = ({ blog, like, token, currentUser, removeBlog, isLoading }) => {
  const [visible, setVisible] = React.useState(false)

  const clickHandler = () => {
    setVisible(!visible)
  }

  const deleteButton = () => {
    if (currentUser === blog.user.username) {
      return <div>
        <button
          onClick={() => deleteHandler()}
          style={
            {
              backgroundColor: '#4a94fb',
              borderRadius: '5px',
              padding: '.5rem',
              cursor: 'pointer'
            }}>remove</button>
      </div>
    }
  }

  const likeHandler = () => {
    like(blog.id, { likes: blog.likes + 1 });
  }

  const deleteHandler = () => {
    if (window.confirm()) {
      removeBlog(blog.id, token)
    }
  }

  let blogData = visible ?
    <div>
      <div
        onClick={clickHandler}
      >
        {blog.title} {blog.author}
      </div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes
      <button
          disabled={isLoading}
          onClick={likeHandler}
        >like</button></div>
      <div>added by {blog.user.name}</div>
      {deleteButton()}
    </div>
    : <div onClick={clickHandler}>{blog.title} {blog.author}</div>

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '50%',
      border: '1px solid black',
      borderRadius: '5px',
      marginBottom: '1px'
    }}>

      {blogData}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNotification: (type, message, timeout) => dispatch(actions.setNotification(type, message, timeout)),
    removeBlog: (id, token) => dispatch(actions.remove(id, token)),
    like: (id, data) => dispatch(actions.addLike(id, data))

  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.data.token,
    currentUser: state.auth.data.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)