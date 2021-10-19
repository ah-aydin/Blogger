import react from 'react';
import { connect } from 'react-redux';

const Home = ({ }) => {
    return(
        <div>
            <h1>Home</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { })(Home);