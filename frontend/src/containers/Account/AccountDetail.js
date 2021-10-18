import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { get_account, get_account_blogs, get_account_blogs_next, follow_account } from '../../redux_actions/account';

const AccountDetail = ({
    match,
    isAuthenticated, account, blogs, user, 
    get_account, get_account_blogs, get_account_blogs_next
}) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        get_account(match.params.id);
    }, []);

    // Get the blogs when the account is retrieved
    useEffect(() => {
        if (account) {
            is_following();
            get_account_blogs(account.email);
        }
    }, [account]);

    const is_following = () => {
        if (!isAuthenticated) return;
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
     * Follows the accound and changes the text on the button
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

    const getBlogs = () => {
        return (
            <div>
                {
                    blogs.results.map((blog, id) => {
                        return (
                        <div>
                            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                            <p>{blog.body}</p>
                        </div>);
                    })
                }
                {blogs.next ? <button onClick={ (e) => get_account_blogs_next(blogs.next) }>Load more</button> : <div /> }
            </div>
        );
    }

    return (
        <div>
            {
                account ? 
                <div>
                    <h1> {account.name} {account.last_name} </h1>
                    { getFollowButton() }
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
    user: state.auth.user
});

export default connect(mapStateToProps, { get_account, get_account_blogs, get_account_blogs_next })(AccountDetail);