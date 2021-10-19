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
            <form onSubmit={onSubmit}>
                <input type='text' onChange={(e) => onChange(e)}></input>
                <button type='submit'>Search<i className='bx bx-search'></i></button>
            </form>
            <BlogList blogs={ blogs } next_list={ search_blogs_next }/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    blogs: state.blog.search_blogs,
});

export default connect(mapStateToProps, { search_blogs, search_blogs_next })(BlogSearch);