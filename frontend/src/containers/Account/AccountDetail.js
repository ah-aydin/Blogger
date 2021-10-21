import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    get_account, follow_account,
    get_account_blogs, get_account_blogs_next,
    get_account_followers, get_account_followers_next
} from '../../redux_actions/account';

import AccountList from '../../components/AccountList';
import BlogList from '../../components/BlogList';

const AccountDetail = ({
    match,
    isAuthenticated, account, blogs, user, followers,
    get_account, get_account_blogs, get_account_blogs_next, get_account_followers, get_account_followers_next
}) => {
    const [isFollowing, setIsFollowing] = useState(false);

    // Run when the pages is loaded and when the id parameter changes
    useEffect(() => {
        get_account(match.params.id);
    }, [match.params.id]);

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

    return (
        <div>
            {
                account ? 
                <div>
                    <h1> {account.name} {account.last_name} </h1>
                    { getFollowButton() }
                    <AccountList accounts={ followers } next_list={ get_account_followers_next } />
                    <h3>Blogs</h3>
                    <BlogList blogs={ blogs } next_list={ get_account_blogs_next } />
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