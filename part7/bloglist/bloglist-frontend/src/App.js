import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Blogs from './components/Blogs/Blogs'
import Notification from './components/Notification/Notification';
import { connect } from 'react-redux';
import actions from './store/actions/actions'


function App({ checkLogin, isAuth, user, logout }) {

  useEffect(() => {

    checkLogin()
  }, [checkLogin])



  return (
    <div className="App">
      <Notification />
      {isAuth ?
        <Blogs
          user={user.name}
          logoutFn={logout}
        />
        : <LoginForm
         
        />}

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(actions.authCheckout()),
    logout: () => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
