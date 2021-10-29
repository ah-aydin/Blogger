import React from 'react';
import { connect } from 'react-redux';

const Success = ({ successes }) => {
    return (
        <ul className='p-0'>
            {successes.map(function(success) {
                return (
                    <li className='list-group-item list-group-item-success mb-1 my-0'>{success}</li>
                );
            })}
        </ul>
    )
}

export default Success;