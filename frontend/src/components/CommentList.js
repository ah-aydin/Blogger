import react from 'react';
import { connect } from 'react-redux';

import { get_blog_comments_next } from '../redux_actions/blog';

import Comment from './Comment';

const CommentList = ({ comments, get_blog_comments_next }) => {
    return (
        <div className='mt-3'>
            <h3>Comments</h3>
            <ul className='mt-1'>
                {
                    comments.results.map((comment, id) => {
                        return (
                            <Comment comment={ comment }/>
                        );
                    })
                }
                { comments.next ? <button className='btn btn-primary btn-block' onClick={ (e) => get_blog_comments_next(comments.next) }>Load more</button> : <div /> }
            </ul>
        </div>
    )
}

export default connect(null, { get_blog_comments_next })(CommentList);