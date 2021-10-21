import react from 'react';
import { Link } from 'react-router-dom';

const AccountSnippet = ({ account }) => {
    return (
        <li>
            <Link to={`/account/${account.id}`} className='card mb-3' style={{textDecoration: 'none'}}>
                <div className='card-body'>
                    <h5 className='card-title'>{account.name} {account.last_name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Follower count: {account.follower_count}</h6>
                </div>
            </Link>
        </li>
    )
}

export default AccountSnippet;