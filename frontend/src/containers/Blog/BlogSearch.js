import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { search_blogs, search_blogs_next } from '../../redux_actions/blog';

import BlogList from '../../components/BlogList';

const BlogSearch = ({ search_blogs, search_blogs_next, blogs }) => {
    const [searchKeword, setSearchKeword] = useState('');

    const onChange = (e) => setSearchKeword(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();

        search_blogs(searchKeword);
    }

    return (
        <div>
            <h1>Blog search</h1>
            <form onSubmit={onSubmit} className='form'>
                <div className='row'>
                    <div className='col-md-11'>
                        <div className='form-group mb-2'>
                            <label for='keyword' class='sr-only'>Search</label>
                            <input className='form-control' type='text' id='keyword' onChange={(e) => onChange(e)}></input>
                        </div>  
                    </div>
                    <div className='col-md-1'>
                        <button type='submit' className='submit-button mb-2'>Search</button>
                    </div>
                </div>
            </form>
            
            <BlogList blogs={ blogs } next_list={ search_blogs_next }/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    blogs: state.blog.search_blogs,
});

export default connect(mapStateToProps, { search_blogs, search_blogs_next })(BlogSearch);