import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const MyAccount = ({ }) => {
    return (
        <div>
            <h1>My account</h1>
        </div>
    );
};

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, { })(MyAccount);