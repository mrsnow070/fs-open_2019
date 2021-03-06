import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Navigation from '../Navigation/Navigation';


export const Layout = (props) => (
    <BrowserRouter>
        <div className="container">
            <Notification />
            <Navigation />
            {props.children}
        </div>
    </BrowserRouter>
)

export default Layout