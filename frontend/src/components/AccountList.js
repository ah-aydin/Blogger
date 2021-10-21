import react from 'react';

import AccountSnippet from './AccountSnippet';

const AccountList = ({ accounts, next_list }) => {
    return(
        <ul>
            {accounts.results.map((account) => {
                return (
                    <AccountSnippet account={ account }/>
                )
            })}
            {accounts.next ? <button className='btn btn-primary btn-block' onClick={ (e) => next_list(accounts.next) }>Load more</button> : <div /> }
        </ul>
    )
}

export default AccountList;