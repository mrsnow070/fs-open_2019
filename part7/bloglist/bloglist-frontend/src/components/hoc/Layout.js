import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Navigation from '../Navigation/Navigation';


export const Layout = (props) => (
    <BrowserRouter>
        <Notification />
        <Navigation />
        {props.children}
    </BrowserRouter>
)

export default Layout