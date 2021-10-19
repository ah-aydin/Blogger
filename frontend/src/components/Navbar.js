import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux_actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {

    const guestLinks = () => {
        if (!isAuthenticated) 
            return (
                <Fragment>
                    <li><Link to='/login'>
                        <span>Login</span>
                    </Link></li>
                    <li><Link to='/signup'>
                        <span>Sign up</span>
                    </Link></li>
                </Fragment>
            );
        return (
            <Fragment />
        );
    }

    const authLinks1 = () => {
        if (isAuthenticated)
            return (
                <Fragment>
                    <li><Link to='/feed'>
                        <span>Feed</span>
                    </Link></li>
                    <li><Link to='/my_account'>
                        <span>My account</span>
                    </Link></li>
                </Fragment>
            );
        return (<Fragment />);
    }

    const authLinks2 = () => {
        if (isAuthenticated) 
            return (
                <Fragment>
                    <li><Link to='/blog/create'>
                        <span>Create blog</span>
                    </Link></li>
                    <li><Link onClick={ logout }>
                        <span>Logout</span>
                    </Link></li>
                </Fragment>
            );
        return (
            <Fragment />
        );
    }
    
    return (
        <div>
            <ul>
                { guestLinks() }
                <li><Link to='/'>
                    <span>Home</span>
                </Link></li>
                { authLinks1() }
                <li><Link to='/discover'>
                    <span>Discover</span>
                </Link></li>
                <li>
                    Search
                    <ul>
                        <li><Link to='/account/search'><span>Account search</span></Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/blog/search'><span>Blog search</span></Link></li>
                    </ul>
                </li>
                { authLinks2() }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);