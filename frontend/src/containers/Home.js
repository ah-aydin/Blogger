import react, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BlogList from '../components/BlogList';
import { get_feed, get_feed_next } from '../redux_actions/feed';

const Home = ({ isAuthenticated, user, blogs, get_feed, get_feed_next }) => {
    useEffect(() => {
        if (user)
            get_feed(user.id);
    }, [isAuthenticated, user]);

    // Redirect to home page if not logged in
    if (!isAuthenticated) {
        return <Redirect to='/discover' />
    }

    return (
        <div>
            <h1>Home</h1>
            <BlogList blogs={ blogs } next_list = { get_feed_next } />
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    blogs: state.feed.feed_blogs
});

export default connect(mapStateToProps, { get_feed, get_feed_next })(Home);