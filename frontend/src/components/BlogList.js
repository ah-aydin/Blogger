import react from 'react';

import BlogSnippet from './BlogSnippet';

const BlogList = ({ blogs, next_list }) => {
    return (
        <ul>
            {blogs.results.map((blog) => {
                return (
                    <BlogSnippet blog={ blog } />
                )
            })}
            {blogs.next ? <button className='btn btn-primary btn-block' onClick={ (e) => next_list(blogs.next) }>Load more</button> : <div /> }
        </ul>
    )
};

export default BlogList;