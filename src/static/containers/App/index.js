import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { authLogoutAndRedirect } from '../../actions/auth';
import SideMenu from '../../components/SideMenu/SideMenu';

import './style.scss';


class App extends React.Component {

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        children: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    render() {
        let nav = null;

        if (this.props.isAuthenticated) {
            nav = (
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target=".navbar-collapse" aria-expanded="false"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">Django React Redux Demo</Link>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle hidden-xs" data-toggle="dropdown" role="button">
                                    User
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#" className="js-logout-button" onClick={this.logout}>Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </nav>
            );
        } else {
            nav = (
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target=".navbar-collapse" aria-expanded="false"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">Django React Redux Demo</Link>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle hidden-xs" data-toggle="dropdown" role="button">
                                    User
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="js-login-button" to="/login">Login</Link></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </nav>
            );
        }

        let result = null;

        if (this.props.isAuthenticated) {
            result = (
                <div>
                    {nav}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-3 col-md-3 col-lg-2">
                                <SideMenu pathName={this.props.pathName} dispatch={this.props.dispatch}/>
                            </div>
                            <div className="col-sm-9 col-md-9">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            result = (
                <div>
                    {nav}
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            );
        }

        return result;
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: state.routing.locationBeforeTransitions.pathname
    };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
