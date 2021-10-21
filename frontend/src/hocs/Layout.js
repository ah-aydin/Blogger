import React from 'react';

import Navbar from '../components/Navbar';

const Layout = (props) => {
    return (
        <div>
            <Navbar />
            <div className='row justify-content-center'>
                <div className='col-md-10 layout'>
                    { props.children }
                </div>
            </div>
        </div>
    );
};

export default Layout;