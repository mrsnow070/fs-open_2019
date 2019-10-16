import React, { useState } from 'react';
import Header from './Header'
import { login } from '../services/login';

const LoginForm = ({ setUser, notificationSetter }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginInput = ({ value }) => {
        setUsername(value);

    }
    const handlePswdInput = ({ value }) => {
        setPassword(value);
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ username, password })
            setUser(result.data);
            window.localStorage.setItem('loggedUser', JSON.stringify(result.data))

        } catch (exception) {
            notificationSetter({
                type: 'error',
                message: exception.response.data.error
            })
        }





    }

    return (
        <>
            <Header text="Log in to application" />
            <form onSubmit={(e) => loginHandler(e)}>
                <div>
                    Username: <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={(e) => handleLoginInput(e.target)}
                    />
                </div>
                <div>
                    Password: <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={(e) => handlePswdInput(e.target)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}


export default LoginForm;