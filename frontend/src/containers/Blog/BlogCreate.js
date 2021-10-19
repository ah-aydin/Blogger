import react from 'react';
import { connect } from 'react-redux';

const BlogCreate = ({}) => {
    return (
        <div>
            <h1>Create blog</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { })(BlogCreate);