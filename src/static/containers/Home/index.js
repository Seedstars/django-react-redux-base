import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import logoImage from './images/react-logo.png';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string
    };

    render() {
        return (
            <div className="container">
                <div className="row margin-top-medium">
                    <div className="small-6 columns">
                        <h1>React Redux Auth Example</h1>
                    </div>
                    <div className="small-6 columns">
                        <img src={logoImage}
                             alt="React Logo"
                        />
                    </div>
                </div>
                <div className="row margin-top-medium">
                    <div className="small-12 columns">
                        <h2>Attempt to access some <Link to="/protected"><b>protected content</b>.</Link></h2>
                    </div>
                </div>
                <div className="row margin-top-medium">
                    <div className="small-12 columns">
                        {this.props.statusText ?
                            <div className="alert alert__info">
                                {this.props.statusText}
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
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
