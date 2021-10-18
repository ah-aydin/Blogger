import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './hocs/Layout';

// Auth component imports
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/SignUp';
import Activate from './containers/Auth/Activate';

// Account component imports
import AccountSearch from './containers/Account/AccountSearch';
import MyAccount from './containers/Account/MyAccount';
import AccountDetail from './containers/Account/AccountDetail';

// Blog component imports
import BlogSearch from './containers/Blog/BlogSearch';
import Blog from './containers/Blog/Blog';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' />

            { /* Feed */ }
            <Route exact path='/feed' />
            <Route exact path='/discover' />

            { /* Auth routes */ }
            <Route exact path='/login'                component={ Login }/>
            <Route exact path='/signup'               component={ Signup }/>
            <Route exact path='/activate/:uid/:token' component={ Activate }/>

            { /* Account routes */ }
            <Route exact path='/account/search'       component={ AccountSearch }/>
            <Route exact path='/account/details'      component={ MyAccount} />
            <Route exact path='/account/:id'          component={ AccountDetail} />

            { /* Blog routes */ }
            <Route exact path='/blog/search'          component={ BlogSearch }/>
            <Route exact path='/blog/:id'             component={ Blog }/>
            <Route exact path='/blog/create' />

            { /* Comment routes */ }
            <Route exact path='/comment/:id' />

          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
