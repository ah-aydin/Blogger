import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    get_account, follow_account,
    get_account_blogs, get_account_blogs_next,
    get_account_followers, get_account_followers_next
} from '../../redux_actions/account';

const AccountDetail = ({
    match,
    isAuthenticated, account, blogs, user, followers,
    get_account, get_account_blogs, get_account_blogs_next, get_account_followers, get_account_followers_next
}) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        get_account(match.params.id);
    }, []);

    // Get the blogs and followers when the account is retrieved
    // Also check if the authenticated user is following the account
    useEffect(() => {
        if (account) {
            is_following();
            get_account_blogs(account.email);
            get_account_followers(account.id);
        }
    }, [account]);

    const is_following = () => {
        // If not authenticated return
        if (!isAuthenticated) return;
        // See if the authenticated user is following the account or not
        axios.get(`${process.env.REACT_APP_URL}api/account/${account.id}/followers/?search=${user.email}`)
        .then(response => {
            if (response.data.count !== 0) {
                setIsFollowing(true);
            } else {
                setIsFollowing(false);
            }
            console.log(isFollowing);
        })
        .catch(err => {
            setIsFollowing(false);
        });
    }

    /**
     * Follows the account and changes the text on the button
     */
    const onClickFollowButton = () => {
        follow_account(account.id);
        setIsFollowing(!isFollowing);
    }

    const getFollowButton = () => {
        return (<Fragment>
            {
                isAuthenticated ? 
                <div><button onClick={ (e) => onClickFollowButton() }>
                    { isFollowing ? 'Following' : 'Follow' }
                </button></div>
                :
                <Fragment />
            }
            </Fragment>
        );
    }

    const getFollowers = () => {
        return (
            <ul>
                {
                    followers.results.map((follower, id) => {
                        return (
                            <li>
                                <Link to={`/account/${follower.follower_id}`}>{follower.follower_name} {follower.follower_last_name}</Link>
                            </li>
                        )
                    })
                }
                {followers.next ? <li><button onClick={ (e) => get_account_followers_next(followers.next)}>Load Mode</button></li> : <div /> }
            </ul>
        );
    }

    const getBlogs = () => {
        return (
            <ul>
                {
                    blogs.results.map((blog, id) => {
                        return (
                        <li>
                            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                            <p>{blog.body}</p>
                        </li>);
                    })
                }
                {blogs.next ? <li><button onClick={ (e) => get_account_blogs_next(blogs.next) }>Load more</button></li> : <div /> }
            </ul>
        );
    }

    return (
        <div>
            {
                account ? 
                <div>
                    <h1> {account.name} {account.last_name} </h1>
                    { getFollowButton() }
                    { getFollowers() }
                    <h3>Blogs</h3>
                    { getBlogs(account.email) }
                </div>
                :
                <div><p>User with the given Id does not exist</p></div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    account: state.account.account,
    blogs: state.account.account_blogs,
    followers: state.account.account_followers,
    user: state.auth.user
});

export default connect(
    mapStateToProps, { 
        get_account, 
        get_account_blogs, get_account_blogs_next, 
        get_account_followers, get_account_followers_next 
    }
)(AccountDetail);