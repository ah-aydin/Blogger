import react from 'react';
import { Link } from 'react-router-dom';

const AccountSnippet = ({ account }) => {
    return (
        <li>
            <Link to={`${account.id}`}>
                <h3>{ account.name } { account.last_name }</h3>
                <p>Follower Count { account.follower_count } </p>
            </Link>
        </li>
    )
}

export default AccountSnippet;