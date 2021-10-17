import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux_actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {

    const guestLinks = () => {
        if (!isAuthenticated) 
            return (
                <Fragment>
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                    <Link to="/signup">
                        <span>Sign up</span>
                    </Link>
                </Fragment>
            );
        return (
            <Fragment />
        );
    }

    const authLinks = () => {
        if (isAuthenticated) 
            return (
                <Fragment>
                    <Link onClick={ logout }>
                        <span>Logout</span>
                    </Link>
                </Fragment>
            );
        return (
            <Fragment />
        );
    }
    
    return (
        <div>
            <ul>
                { authLinks() }
                { guestLinks() }
                <div>
                    Search
                    <ul>
                        <li><Link to='/account/search'><span>Account search</span></Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/blog/search'><span>Blog search</span></Link></li>
                    </ul>
                </div>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);