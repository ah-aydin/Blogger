import { combineReducers } from 'redux';

import account from './account';
import auth from './auth';
import blog from './blog';
import feed from './feed';

export default combineReducers({
    account, auth, blog, feed
});