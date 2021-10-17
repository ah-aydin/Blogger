import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { get_blog } from '../../redux_actions/blog';

import Logs from '../Logs/Logs';

const Blog = ({ match, blog, get_blog }) => {
    const blogId = match.params.id;

    useEffect(() => {
        get_blog(blogId);
    }, []);

    return (
        <div>
            { blog ? 
                <div>
                    <h3>{ blog.title }</h3>
                    <p>{ blog.body }</p>
                </div> 
                : 
                <div />
            }
            <Logs />
        </div>
    );
};

const mapStateToProps = (state) => ({
    blog: state.blog.blog,
});

export default connect(mapStateToProps, { get_blog } )(Blog);