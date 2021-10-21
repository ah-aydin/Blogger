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
                        <Link to='/login' id='login' className='nav-link'><i class="bi bi-box-arrow-in-right"></i> Login</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/signup' id='sign-up' className='nav-link'><i class="bi bi-person-plus-fill"></i> Sign up</Link>
                    </li>
                </Fragment>
            );
        return (
            <Fragment />
        );
    }

    const authLinks0 = () => {
        if (isAuthenticated)
            return (
                <Fragment>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link' id='home' ><i class="bi bi-house-door-fill"></i> Home</Link>
                    </li>
                </Fragment>
            );
        return (<Fragment />);
    }

    const authLinks1 = () => {
        if (isAuthenticated)
            return (
                <Fragment>
                    <li className='nav-item'>
                        <Link to='/my_account' id='my-account' className='nav-link'><i class="bi bi-person-fill"></i> My account</Link>
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
                        <Link to='/blog/create' id='create-blog' className='nav-link'><i class="bi bi-plus-square-fill"></i> Create blog</Link>
                    </li>
                    <li className='nav-item'>
                        <Link onClick={logout} id='logout' className='nav-link'><i class="bi bi-box-arrow-left"></i> Logout</Link>
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
                <Link className='navbar-brand' to='/'>Blogger</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        {authLinks0()}
                        <li className='nav-item'>
                            <Link to='/discover' id='dicover' className='nav-link'><i class="bi bi-compass-fill"></i> Discover</Link>
                        </li>
                        {guestLinks()}
                        {authLinks1()}
                        <li className='nav-item dropdown'>
                            <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                <i class="bi bi-search"></i> Search
                            </a>
                            <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                                <li><Link className='dropdown-item' to='/account/search'><i class="bi bi-person-lines-fill"></i> Account</Link></li>
                                <li><Link className='dropdown-item' to='/blog/search'><i class="bi bi-card-text"></i> Blog</Link></li>
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