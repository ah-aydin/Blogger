import React from 'react';
import { connect } from 'react-redux';

const Error = ({ errors }) => {
    return (
        <ul className='p-0'>
            {errors.map(function(error) {
                return (
                    <li className='list-group-item list-group-item-danger mb-1 my-0'>{error}</li>
                );
            })}
        </ul>
    )
};


export default Error;