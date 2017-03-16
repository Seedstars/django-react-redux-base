import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';

import './style.scss';
import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string,
        actions: React.PropTypes.shape({
            dataExecuteAsyncTask: React.PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    render() {
        return (
            <div className="container">
                <div className="margin-top-medium text-center">
                    <img className="page-logo margin-bottom-medium"
                         src={reactLogo}
                         alt="ReactJs"
                    />
                    <img className="page-logo margin-bottom-medium"
                         src={reduxLogo}
                         alt="Redux"
                    />
                </div>
                <div className="text-center">
                    <h1>Django React Redux Demo</h1>
                    <h4>Hello, {this.props.userName || 'guest'}.</h4>
                </div>
                <div className="margin-top-medium text-center">
                    <p>Attempt to access some <Link to="/protected"><b>protected content</b></Link>...</p>
                </div>
                <div className="margin-top-medium text-center">
                    <p>...or...</p>
                    <button className="btn btn-default"
                            onClick={this.props.actions.dataExecuteAsyncTask}
                    >
                        <b>execute an asynchronous task</b>
                    </button>
                    <p>
                        (There is also a periodic task running every minute on the scheduler container
                        . Keep an eye on the docker console!)
                    </p>
                </div>
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
