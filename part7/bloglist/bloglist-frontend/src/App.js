import React, { useEffect } from 'react';
import './assets/scss/index.scss';

import { connect } from 'react-redux';
import actions from './store/actions/actions';

import Layout from './components/hoc/Layout';
import Users from './components/Users/Users';
import Blogs from './components/Blogs/Blogs'

import { Route } from 'react-router-dom'
import SingleUser from './components/Users/SingleUser';
import SingleBlog from './components/Blogs/Blog/SingleBlog';


function App({ checkLogin }) {

  useEffect(() => {
    checkLogin()
  }, [checkLogin])



  return (
    <div className="App">
      <Layout>


        <Route path="/" exact render={() => <Blogs />} />
        <Route path="/users/:id" exact render={
          ({ match }) => <SingleUser id={match.params.id} />} />
        <Route path="/blogs/:id" exact render={
          ({ match }) => <SingleBlog id={match.params.id} />} />
        <Route path="/users" exact render={() => <Users/>} />
      </Layout>
    </div>
  );
}



const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(actions.authCheckout()),
  }
}

export default connect(null, mapDispatchToProps)(App);
