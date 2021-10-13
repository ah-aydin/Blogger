import React from 'react';

import Success from './Success';
import Error from './Error';

const Logs = ({ errors }) => {
    return (
        <div>
            <Success />
            <Error />
        </div>
    )
};

export default Logs;