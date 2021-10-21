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
            <h1 className='mb-3'>Blog search</h1>
            <form className='row g-3' onSubmit={onSubmit}>
                <div className='col-md-11'>
                    <label for='keyword' className='visually-hidden'>Keyword</label>
                    <input type='text' className='form-control' id='keyword' placeholder='Password' onChange={(e) => onChange(e)}/>
                </div>
                <div className='col-md-1'>
                    <button type='submit' className='btn btn-primary btn-block mb-3'>Search</button>
                </div>
            </form>
            <BlogList blogs={blogs} next_list={search_blogs_next} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    blogs: state.blog.search_blogs,
});

export default connect(mapStateToProps, { search_blogs, search_blogs_next })(BlogSearch);