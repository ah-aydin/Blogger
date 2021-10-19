import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_blog, get_blog_comments, post_comment } from '../../redux_actions/blog';

import CommentList from '../../components/CommentList';

const Blog = ({ match,
    get_blog, get_blog_comments, post_comment,
    blog, comments, isAuthenticated, change
}) => {
    const blogId = match.params.id;
    const [commentText, setCommentText] = useState('');

    // Get the blog
    useEffect(() => {
        get_blog(blogId);
    }, []);
    // Get the comments after the blog has been retrieved
    useEffect(() => {
        if (blog != null)
            get_blog_comments(blog.comments_url);
    }, [blog, change]);

    const onChange = (e) => setCommentText(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();

        // Post the comment
        post_comment(blog.id, commentText);
    }

    /**
     * @returns The comment posting section if there is an authenticated user
     */
    const getCommentPosting = () => {
        if (isAuthenticated) {
            return (
                <form onSubmit={(e) => onSubmit(e)}>
                    <h3>Post comment</h3>
                    <div>
                        <textarea 
                            placeholder='Comment...' id='comment' name='comment' cols="50" rows="10" 
                            value={commentText} onChange={(e) => onChange(e)} required
                        />
                    </div>
                    <button type='submit'>Post</button>
                </form>
            );
        }
        else return (
            <Link to='/login'>Login to post a comment</Link>
        );
    }

    
    return (
        <div>
            { blog ? 
                <div>
                    { /* Main part of the blog */ }
                    <div>
                        <span>Publish date: {blog.date_created}</span>
                        <h2>{ blog.title }</h2>
                        <h5>{ blog.subtitle }</h5>
                        <p>{ blog.body }</p>
                    </div>
                    { /* Posting comment section */ }
                    { getCommentPosting() }
                    <CommentList comments={ comments }/>
                </div>
                : 
                <div><p>Blog with the given id does not exist</p></div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    blog: state.blog.blog,
    comments: state.blog.blog_comments,
    change: state.blog.change
});

export default connect(mapStateToProps, { get_blog, get_blog_comments, post_comment } )(Blog);