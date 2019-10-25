import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import actions from '../../store/actions/actions';
import Header from '../Header';

export const Single_User = ({ getUser, id, user }) => {
    console.log(user)
    useEffect(() => {
        getUser(id)
    }, [getUser, id])
    return (
        <div>
            <Header text={user.username} />
            Single_User_ID={id} <br />
            User:{user.name}<br />
            Username:{user.username}
            <ol>
                {user.blogs.map(blog => <li key={blog}>{blog}</li>)}
            </ol>
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUser: (id) => dispatch(actions.getUser(id))

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.singleUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Single_User)