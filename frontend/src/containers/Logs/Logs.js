import React from 'react';

import Success from './Success';
import Error from './Error';

const Logs = ({ successes, errors }) => {
    return (
        <div>
            <Success successes={successes} />
            <Error errors={errors}/>
        </div>
    )
};

export default Logs;