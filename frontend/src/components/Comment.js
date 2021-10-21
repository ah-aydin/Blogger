import react, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { delete_comment } from '../redux_actions/blog'

const Comment = ({ comment, user, delete_comment, isAuthenticated }) => {
    /**
     * @param comment_author_id Id of the comments author
     * @returns A delete button if the authenticated user is its owner
     */
    const isOwnerOfComment = (comment_author_id, comment_id) => {
        if (isAuthenticated) {
            if (user.id === comment_author_id) {
                return (
                    <button className='btn btn-danger' onClick={() => {
                        delete_comment(`${comment_id}`);
                    }
                    }>Delete</button>
                )
            }
        }
        return <Fragment />
    }

    return (
        <li className='card mb-3'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-11'>
                        <p className='card-text'>{comment.body}</p>
                    </div>
                    <div className='col-md-1'>
                        {isOwnerOfComment(comment.author_id, comment.id)}
                    </div>
                </div>
            </div>
            <hr style={{margin: 0}}/>
            <div className='card-body'>
                <Link to={`/account/${comment.author_id}`} className='card-link'>{comment.author_name} {comment.author_last_name}</Link>
            </div>
        </li>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { delete_comment })(Comment);