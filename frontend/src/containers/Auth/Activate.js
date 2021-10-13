import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { activate } from '../../redux_actions/auth';

import Logs from '../Logs/Logs';

const Activate = ({ activate, match }) => {

    const activate_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;
        activate(uid, token);
    }

    return (
        <div>
            <h1>Activate you're account</h1>
            <button onClick={activate_account}>Activate</button>
            <Logs />
        </div>
    );
};

export default connect(null, { activate })(Activate);