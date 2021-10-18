import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_blog, get_blog_comments, get_blog_comments_next, post_comment, delete_comment } from '../../redux_actions/blog';

const Blog = ({ match,
    get_blog, get_blog_comments, get_blog_comments_next, post_comment, delete_comment,
    blog, comments, isAuthenticated, user, change
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
                        <input 
                            type='text' placeholder='Comment...' id='comment' name='comment' 
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

    /**
     * @param comment_author_id Id of the comments author
     * @returns A delete button if the authenticated user is its owner
     */
    const isOwnerOfComment = (comment_author_id, comment_id) => {
        if (isAuthenticated) {
            if (user.id === comment_author_id) {
                return (
                    <button onClick={ () => {
                            delete_comment(`${comment_id}`);
                        }
                    }>Delete</button>
                )
            }
        }
        return <Fragment />
    }

    /**
     * @returns Display of the comments
     */
    const getComments = () => {
        return (
            <div>
                {
                    comments.results.map((comment, id) => {
                        return (
                        <div>
                            <Link to={`/account/${comment.author_id}`}>{comment.author_name} {comment.author_last_name}</Link>
                            <p>{comment.body}</p>
                            { isOwnerOfComment(comment.author_id, comment.id) }
                        </div>);
                    })
                }
                {comments.next ? <button onClick={ (e) => get_blog_comments_next(comments.next) }>Load more</button> : <div /> }
            </div>
        );
    }
    
    return (
        <div>
            { blog ? 
                <div>
                    { /* Main part of the blog */ }
                    <div>
                        <h3>{ blog.title }</h3>
                        <p>{ blog.body }</p>
                    </div>
                    { /* Posting comment section */ }
                    { getCommentPosting() }
                    { /* Comments that are made so far for the blog */ }
                    { getComments() }
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
    change: state.blog.change,
    user: state.auth.user
});

export default connect(mapStateToProps, { get_blog, get_blog_comments, get_blog_comments_next, post_comment, delete_comment } )(Blog);