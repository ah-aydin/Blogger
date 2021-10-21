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
            <h1 className='mb-3'>Account search</h1>
            <form className='row g-3' onSubmit={onSubmit}>
                <div className='col-md-11'>
                    <label for='keyword' className='visually-hidden'>Keyword</label>
                    <input type='text' className='form-control' id='keyword' placeholder='Password' onChange={(e) => onChange(e)}/>
                </div>
                <div className='col-md-1'>
                    <button type='submit' className='btn btn-primary btn-block mb-3'>Search</button>
                </div>
            </form>
            <AccountList accounts={ accounts } next_list={ search_accounts_next }/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    accounts: state.account.search_accounts,
});

export default connect(mapStateToProps, { search_accounts, search_accounts_next })(AccountSearch);