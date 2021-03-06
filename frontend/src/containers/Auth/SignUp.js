import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signup } from '../../redux_actions/auth';

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
            <form className='' onSubmit={(e) => onSubmit(e)}>
                <h1>Signup</h1>
                <p>Login to you're account</p>
                <div className='mb-3'>
                    <label for='email' class='form-label'>Email address</label>
                    <input className='form-control'
                        type='email' placeholder='example@gmail.com' id='email' name='email' 
                        value={email} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='mb-3'>
                    <label for='name' class='form-label'>Name</label>
                    <input className='form-control'
                        type='text' placeholder='John' id='name' name='name'
                        value={name} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='mb-3'>
                    <label for='last_name' class='form-label'>Last name</label>
                    <input className='form-control'
                        type='text' placeholder='Doe' id='last_name' name='last_name'
                        value={last_name} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='mb-3'>
                    <label for='password' class='form-label'>Password</label>
                    <input className='form-control'
                        type='password' placeholder='Password' id='password' name='password'
                        value={password} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='mb-3'>
                    <label for='re_password' class='form-label'>Repeat password</label>
                    <input className='form-control'
                        type='password' placeholder='Password' id='re_password' name='re_password'
                        value={re_password} onChange={(e) => onChange(e)} required
                    />
                </div>
                <button type='submit' className='btn btn-primary btn-block mb-2'>Sign up</button>
                <p>Have an account? <Link to='/login'>Log in</Link></p>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);