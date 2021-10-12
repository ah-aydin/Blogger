import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './hocs/Layout';

import Login from './containers/Auth/Login';
import Signup from './containers/Auth/SignUp';
import Activate from './containers/Auth/Activate';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            { /* Auth routes*/ }
            <Route exact path='/login'                component={ Login }/>
            <Route exact path='/signup'               component={ Signup }/>
            <Route exact path='/activate/:uid/:token' component={ Activate }/>

          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
