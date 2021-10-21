import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux_actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {

    const guestLinks = () => {
        if (!isAuthenticated)
            return (
                <Fragment>
                    <li className='nav-item'>
                        <Link to='/login' id='login' className='nav-link' >Login</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/signup' id='sign-up' className='nav-link' >Sign up</Link>
                    </li>
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
                    <li className='nav-item'>
                        <Link to='/feed' id='feed' className='nav-link' >Feed</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/my_account' id='my-account' className='nav-link' >My account</Link>
                    </li>
                </Fragment>
            );
        return (<Fragment />);
    }

    const authLinks2 = () => {
        if (isAuthenticated)
            return (
                <Fragment>
                    <li className='nav-item'>
                        <Link to='/blog/create' id='create-blog' className='nav-link' >Create blog</Link>
                    </li>
                    <li className='nav-item'>
                        <Link onClick={logout} id='logout' className='nav-link'>Logout</Link>
                    </li>
                </Fragment>
            );
        return (
            <Fragment />
        );
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#'>Blogger</a>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-link' id='home' >Home</Link>
                        </li>
                        {guestLinks()}
                        {authLinks1()}
                        <li className='nav-item dropdown'>
                            <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                Search
                            </a>
                            <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                                <li><Link className='dropdown-item' to='/account/search'>Account</Link></li>
                                <li><Link className='dropdown-item' to='/blog/search'>Blog</Link></li>
                                <li><hr className='dropdown-divider' /></li>
                                <li><a className='dropdown-item' href='#'>Something else here</a></li>
                            </ul>
                        </li>
                        {authLinks2()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);