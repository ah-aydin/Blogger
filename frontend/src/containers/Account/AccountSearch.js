import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { search_accounts, search_accounts_next } from '../../redux_actions/account';

const AccountSearch = ({ accounts, search_accounts_next, search_accounts }) => {
    const [searchKeword, setSearchKeword] = useState('');

    const onChange = (e) => setSearchKeword(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();

        search_accounts(searchKeword);
    }

    return (
        <div>
            <h1>Account search</h1>
            <form onSubmit={onSubmit}>
                <input type='text' onChange={(e) => onChange(e)}></input>
                <button type='submit'>Search<i className='bx bx-search'></i></button>
            </form>
            <div>
                <h1> ACCOUNT LIST </h1>
                {accounts.results.map((account) => {
                    return (
                        <Link to={`${account.id}`}>
                            <h3>{ account.name } { account.last_name }</h3>
                        </Link>
                    )
                })}
            </div>
            {accounts.next ? <button onClick={ (e) => search_accounts_next(accounts.next) }>Load more</button> : <div /> }
        </div>
    );
};

const mapStateToProps = (state) => ({
    accounts: state.account.search_accounts,
});

export default connect(mapStateToProps, { search_accounts, search_accounts_next })(AccountSearch);