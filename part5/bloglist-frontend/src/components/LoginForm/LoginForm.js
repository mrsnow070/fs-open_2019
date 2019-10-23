import React from 'react';
import Header from '../Header'
import { login } from '../../services/login';
import { useField } from '../../hooks';

const LoginForm = ({ setUser, notificationSetter }) => {
    const usernameInput = useField('text');
    const passwordInput = useField('password');

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ username: usernameInput.value, password: passwordInput.value })
            window.localStorage.setItem('loggedUser', JSON.stringify(result.data))
            setUser(result.data);

        } catch (exception) {
            notificationSetter({
                type: 'error',
                message: exception.response.data.error
            })
            passwordInput.onReset();
        }

    }

    return (
        <>
            <Header text="Log in to application" />
            <form onSubmit={(e) => loginHandler(e)}>
                <div>
                    Username: <input
                        {...usernameInput}
                        autoComplete="username"
                    />
                </div>
                <div>
                    Password: <input
                        {...passwordInput}
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}


export default LoginForm;