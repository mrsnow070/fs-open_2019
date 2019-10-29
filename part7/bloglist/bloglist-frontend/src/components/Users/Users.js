import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import actions from '../../store/actions/actions'
import { Link } from 'react-router-dom';

export const Users = ({ users, getUsers }) => {

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const userTable = users.map(user => {
        return (
            <tr
                className="tab__row"
                key={user.username}>
                <td className="tab__cell" >
                    <Link className="blog-list__item--link"
                        to={`/users/${user.id}`}>
                        {user.username}
                    </Link>
                </td>
                <td className="tab__cell">
                    {user.blogs.length}
                </td>
            </tr>
        )
    })

    return (
        <table className="tab">

            <tbody className="tab__body">
                <tr className="tab__row">
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {userTable}
            </tbody>
        </table>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.users.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            dispatch(actions.getAllUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)