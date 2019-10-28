import React, { useState } from 'react'
import NavItem from './NavItem'
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';


export const Navigation = ({ user, logout }) => {
    const [navItems] = useState([

        {
            text: 'Blogs',
            url: '/'
        },
        {
            text: 'Users',
            url: '/users'
        }
    ])

    let navigation = navItems.map(item => <NavItem key={item.text} url={item.url}>{item.text}</NavItem>)

    return (
        <nav className="nav">
            <ul className="nav__list">
                {navigation}
                {user.token !== null ?
                    <li className="nav__list-item--user">
                        {`${user.name} is logged in`}
                        <button
                            onClick={logout}
                            className="nav__list-item--logout">
                            logout
                    </button>
                    </li>
                    : null
                }
            </ul>
        </nav>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.data
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)