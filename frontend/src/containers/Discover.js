import react, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Discover = ({  }) => {
    return (
        <div>
            <h1>Discover</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, { })(Discover);