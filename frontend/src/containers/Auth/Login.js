import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../redux_actions/auth';

import Logs from '../Logs/Logs';

const Login = ({ login, isAuthenticated }) => {
    // Store the data from the form
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // If the user is authenticated, redirect to the home page
    if (isAuthenticated)
        return <Redirect to='/' />

    // Handle form events
    const { email, password } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);
    }

    return (
        <div>
            <form onSubmit={ (e) => onSubmit(e) }>
                <h1>Login</h1>
                <p>Login to you're account</p>
                <div className='mb-3'>
                    <label for='emailinput' className='form-label'>Email address</label>
                    <input type='email' className='form-control' id='email-input' placeholder='name@example.com' name='email'
                        value={email} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='mb-3'>
                    <label for='password-input' className='form-label'>Password</label>
                    <input type='text' className='form-control' id='password-input' placeholder='password' name='password'
                        value={password} onChange={(e) => onChange(e)} required
                    />
                </div>
                <button type='submit' className='btn btn-primary btn-block mb-2'>Login</button>
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </form>
            <Logs />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);