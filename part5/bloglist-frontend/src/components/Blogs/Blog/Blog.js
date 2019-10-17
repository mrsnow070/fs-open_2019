import React from 'react';
import { update, remove } from '../../../services/blogs'

const Blog = ({ blog, updateBlogs, notificationSetter }) => {
  const [visible, setVisible] = React.useState(false)

  const clickHandler = () => {
    setVisible(!visible)
  }

  const deleteButton = () => {
    const currentUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (currentUser.name === blog.user.name) {
      return <div>
        <button
          onClick={deleteHandler}
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

  const likeHandler = async () => {

    try {
      await update(blog.id, { likes: blog.likes + 1 })
      await updateBlogs();
    } catch (exception) {
      notificationSetter({
        type: 'error',
        message: exception.response
      })
    }

  }

  const deleteHandler = async () => {

    if (window.confirm()) {
      try {
        await remove(blog.id);
        await updateBlogs();
        notificationSetter({
          type: 'notification',
          message: 'Successfully deleted'
        })
      } catch (exception) {
        notificationSetter({
          type: 'error',
          message: exception.response
        })
      }

    }
  }

  let blogData = visible ?
    <div>
      <div onClick={clickHandler}>{blog.title} {blog.author}</div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={likeHandler}>like</button></div>
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

export default Blog