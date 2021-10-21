import react from 'react';
import { connect } from 'react-redux';

const MyAccount = ({ user }) => {
    return (
        <div>
            <h1>My account</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { })(MyAccount);