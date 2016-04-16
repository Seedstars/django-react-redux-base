import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import logoImage from './react-logo.png';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string
    };

    render() {
        return (
            <div>
                <h1>React Redux Auth Example</h1>
                <img src={logoImage} className="pull-right" alt="React Logo"/>
                {this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : ''}
                <p>Attempt to access some <Link to="/protected">protected content.</Link></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
