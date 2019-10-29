import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import notificationReducer from './store/reducers/notificationReducer';
import authReducer from './store/reducers/authReducer';
import blogsReducer from './store/reducers/blogsReducer';
import usersReducer from './store/reducers/usersReducer';



// @ts-ignore
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    notif: notificationReducer,
    auth: authReducer,
    blog: blogsReducer,
    users: usersReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>

        <App />

    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))