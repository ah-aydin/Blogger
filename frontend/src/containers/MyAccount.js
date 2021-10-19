import react from 'react';
import { connect } from 'react-redux';

const MyAccount = ({ }) => {
    return (
        <div>
            <h1>My account</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { })(MyAccount);