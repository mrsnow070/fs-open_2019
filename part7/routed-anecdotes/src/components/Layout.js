import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Footer from './Footer';
import Menu from './Menu';
import Notification from './Notification'


export const Layout = ({ children, notification }) => {
    return (
        <BrowserRouter>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={notification} />
            {children}



            <Footer />
        </BrowserRouter>
    )
}

export default Layout