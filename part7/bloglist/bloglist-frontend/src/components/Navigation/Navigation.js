import React, { useState } from 'react'
import NavItem from './NavItem'
 

export const Navigation = (props) => {
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
                {/* <li><Link to="/" >Home</Link></li> */}
                {navigation}
            </ul>
        </nav>
    )
}

export default Navigation