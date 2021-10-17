import React from 'react';

import Navbar from '../components/Navbar';

// TODO Add styling + a navbar
const Layout = (props) => {
    return (
        <div>
            <Navbar />
            { props.children }
        </div>
    );
};

export default Layout;