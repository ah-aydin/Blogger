import react, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { create_blog } from '../../redux_actions/blog';

const BlogCreate = ({ isAuthenticated, create_blog }) => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        body: ''
    });

    const { title, subtitle, body } = formData;
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = (e) => {
        e.preventDefault();
        
        // Create the blog
        create_blog(title, subtitle, body);
    }

    // If not authenticated, redirect to home page
    if (!isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <h1>Create blog</h1>
                <div className='mb-3'>
                    <label for='title' className='form-label'>Title</label>
                    <input className='form-control' 
                    type='text' id='title' name='title' placeholder='Title'
                        value={title} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='mb-3'>
                    <label for='subtitle' className='form-label'>Subtitle</label>
                    <input className='form-control' 
                    type='text' id='subtitle' name='subtitle' placeholder='Subtitle'
                        value={subtitle} onChange={(e) => onChange(e)} required
                    />
                </div>
                <div className='mb-3'>
                    <label for='body' className='form-label'>Body</label>
                    <textarea className='form-control'
                        placeholder='Body...' id='body' name='body' cols="50" rows="10" 
                        value={body} onChange={(e) => onChange(e)} required
                    />
                </div>
                <button type='subimt' className='btn btn-primary btn-block'>Post blog</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { create_blog })(BlogCreate);