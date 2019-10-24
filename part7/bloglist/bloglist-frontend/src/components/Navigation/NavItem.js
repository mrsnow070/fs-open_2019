import React from 'react'
import { Link } from 'react-router-dom';

export const NavItem = ({ children, url }) => {
    return (
        <li className="nav__list-item">
            <Link to={url}>{children}</Link>
        </li>
    )
}

export default NavItem