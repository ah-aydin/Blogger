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
                    <button onClick={ () => {
                            delete_comment(`${comment_id}`);
                        }
                    }>Delete</button>
                )
            }
        }
        return <Fragment />
    }

    return(
        <li>
            <Link to={`/account/${comment.author_id}`}>{comment.author_name} {comment.author_last_name}</Link>
            <p>{comment.body}</p>
            { isOwnerOfComment(comment.author_id, comment.id) }
        </li>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { delete_comment })(Comment);