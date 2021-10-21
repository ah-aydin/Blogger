import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signup } from '../../redux_actions/auth';

import Logs from '../Logs/Logs';

const SignUp = ({ signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        'email': '',
        'name': '',
        'last_name': '',
        'password': '',
        're_password': '' 
    });

    // If the user is authenticated, redirect to the home page
    if (isAuthenticated)
        return <Redirect to='/'/>
    
    // Handle form events
    const { email, name, last_name, password, re_password } = formData;
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();

        // Return if the passwords do not match
        signup(email, name, last_name, password, re_password);
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <h1>Signup</h1>
                <p>Login to you're account</p>
                <div className='form-group'>
                    <label for='email'>Email address</label>
                    <input className='form-control'
                        type='email' placeholder='example@gmail.com' id='email' name='email' 
                        value={email} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='form-group'>
                    <label for='name'>Name</label>
                    <input className='form-control'
                        type='text' placeholder='John' id='name' name='name'
                        value={name} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='form-group'>
                    <label for='last_name'>Last name</label>
                    <input className='form-control'
                        type='text' placeholder='Doe' id='last_name' name='last_name'
                        value={last_name} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='form-group'>
                    <label for='password'>Password</label>
                    <input className='form-control'
                        type='password' placeholder='Password' id='password' name='password'
                        value={password} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='form-group'>
                    <label for='re_password'>Repeat password</label>
                    <input className='form-control'
                        type='password' placeholder='Password' id='re_password' name='re_password'
                        value={re_password} onChange={(e) => onChange(e)} required
                    />
                </div>
                <button type='submit' className='submit-button'>Sign up</button>
                <p>Have an account? <Link to='/login'>Log in</Link></p>
            </form>
            <Logs />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);