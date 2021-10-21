import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './hocs/Layout';

import Home from './containers/Home';
import MyAccount from './containers/MyAccount';
import Discover from './containers/Discover';

// Auth component imports
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/SignUp';
import Activate from './containers/Auth/Activate';

// Account component imports
import AccountSearch from './containers/Account/AccountSearch';
import AccountDetail from './containers/Account/AccountDetail';

// Blog component imports
import BlogSearch from './containers/Blog/BlogSearch';
import Blog from './containers/Blog/Blog';
import BlogCreate from './containers/Blog/BlogCreate';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/'                     component={ Home } />
            <Route exact path='/discover'             component={ Discover } />
            <Route exact path='/my_account'           component={ MyAccount } />

            { /* Auth routes */ }
            <Route exact path='/login'                component={ Login }/>
            <Route exact path='/signup'               component={ Signup }/>
            <Route exact path='/activate/:uid/:token' component={ Activate }/>

            { /* Account routes */ }
            <Route exact path='/account/search'       component={ AccountSearch }/>
            <Route exact path='/account/:id'          component={ AccountDetail} />

            { /* Blog routes */ }
            <Route exact path='/blog/create'          component={ BlogCreate } />
            <Route exact path='/blog/search'          component={ BlogSearch } />
            <Route exact path='/blog/:id'             component={ Blog } />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
