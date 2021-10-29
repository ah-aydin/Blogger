import react, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import AccountList from '../../components/AccountList';
import BlogList from '../../components/BlogList';
import Logs from '../Logs/Logs';
import { change_user_data, get_user_followers_next, get_user_blogs_next } from '../../redux_actions/auth';

import '../../css/my_account.css';

const MyAccount = ({ 
    user, isAuthenticated, followers, blogs,
    change_user_data, get_user_followers_next, get_user_blogs_next
}) => {
    const [formData, setFormData] = useState({
        name: '',
        last_name: ''
    });

    const [succ, setSucc] = useState(false);
    const [fail, setFail] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Get the data from the user if there is a logged in user
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                last_name: user.last_name
            });
        }
    }, []);

    // Set the flags for being or not being able to update the information about the user
    useEffect(() => {
        if (user && submitted) {
            setSubmitted(false);
            if (user.name === name && user.last_name === last_name) {
                setSucc(true);
                setFail(false);
            }
            else {
                setFail(true);
                setSucc(false);
            }
        }
    }, [user])

    // Form functions
    const { name, last_name } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmitDetails = (e) => {
        e.preventDefault();
    
        change_user_data(user.id, name, last_name, user.email);
        setSubmitted(true);
    }

    // Redirect if not authenticated
    if (!isAuthenticated)
        return <Redirect to='/' />

    return (
        <div>
            <div className='grid'>
                <form onSubmit={(e) => onSubmitDetails(e)} className='card mb-4 info-form p-2'>
                    <h3>Account details</h3>
                    <div className='mb-3'>
                        <label for='nameInput' className='form-label'>Name</label>
                        <input type='text' className='form-control' id='nameInput' name='name' value={name} onChange={(e) => onChange(e)} required/>
                    </div>
                    <div className='mb-3'>
                        <label for='lastNameInput' className='form-label'>Last name</label>
                        <input type='text' className='form-control' id='lastNameInput' name='last_name' value={last_name} onChange={(e) => onChange(e)} required/>
                    </div>
                    <button type='submit' className='btn btn-primary mb-3'>Update</button>
                    <Logs successes={ succ ? ['Updated information'] : []} errors={ fail ? ['Failed to update information'] : []} />
                    <ul className='list-group list-group-flush fw-bolder'>
                        <li className='list-group-item d-flex p-auto'>Date joined: <p className='flex-fill text-end'>{ user.date_joined }</p></li>
                        <li className='list-group-item d-flex p-auto'>Blog count: <p className='flex-fill text-end'>{ user.blog_count }</p></li>
                        <li className='list-group-item d-flex p-auto'>Follower count: <p className='flex-fill text-end'>{ user.follower_count} </p></li>
                    </ul>
                </form>

                <div className='card follower-scroll'>
                    <AccountList accounts={ followers } next_list={ get_user_followers_next }/>
                </div>
            </div>
            <h2 className='mt-3 mb-4'>Blogs</h2>
            <BlogList blogs={ blogs } next_list={ get_user_blogs_next }/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    followers: state.auth.followers,
    blogs: state.auth.blogs
});

export default connect(mapStateToProps, { change_user_data, get_user_followers_next, get_user_blogs_next })(MyAccount);