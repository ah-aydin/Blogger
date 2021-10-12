import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../redux_actions/auth';

const Login = ({ login, isAuthenticated }) => {
    // Store the data from the form
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // If the user is authenticated, redirect to the home page
    if (isAuthenticated)
        return <Redirect to='/'/>

    // Handle form events
    const { email, password } = formData;
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        
        login(email, password);
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <h1>Login</h1>
                <p>Login to you're account</p>
                <div>
                    <label>Email address</label>
                    <input 
                        type='email' placeholder='example@gmail.com' id='email' name='email' 
                        value={email} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type='password' placeholder='Password' id='password' name='password'
                        value={password} onChange={(e) => onChange(e)} required
                    />
                </div>
                <button type='submit'>Login</button>
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);