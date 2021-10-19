import react from 'react';
import { connect } from 'react-redux';

import { get_blog_comments_next } from '../redux_actions/blog';

import Comment from './Comment';

const CommentList = ({ comments, get_blog_comments_next }) => {
    return (
        <ul>
            {
                comments.results.map((comment, id) => {
                    return (
                        <Comment comment={ comment }/>
                    );
                })
            }
            { comments.next ? <button onClick={ (e) => get_blog_comments_next(comments.next) }>Load more</button> : <div /> }
        </ul>
    )
}

export default connect(null, { get_blog_comments_next })(CommentList);