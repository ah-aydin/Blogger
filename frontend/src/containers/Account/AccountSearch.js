import React, { useState } from 'react';
import { connect } from 'react-redux';

import { search_accounts, search_accounts_next } from '../../redux_actions/account';
import AccountList from '../../components/AccountList';

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
            <AccountList accounts={ accounts } next_list={ search_accounts_next }/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    accounts: state.account.search_accounts,
});

export default connect(mapStateToProps, { search_accounts, search_accounts_next })(AccountSearch);