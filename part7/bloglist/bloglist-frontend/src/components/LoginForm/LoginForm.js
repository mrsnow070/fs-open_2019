import React from 'react';
import Header from '../Header'
import { connect } from 'react-redux';
import actions from '../../store/actions/actions';
import { useField } from '../../hooks';

const LoginForm = ({ startLogin, loading }) => {
    const usernameInput = useField('text');
    const passwordInput = useField('password');

    const loginHandler = async (e) => {
        e.preventDefault();
        startLogin({
            username: usernameInput.value,
            password: passwordInput.value
        })
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
                <button
                    disabled={loading}
                    type="submit"
                >login</button>
            </form>
        </>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: (data) => dispatch(actions.auth(data))

    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)