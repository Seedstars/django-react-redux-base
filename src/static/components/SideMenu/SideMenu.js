import React from 'react';
import { routeActions } from 'react-router-redux';
import classNames from 'classnames';

import { authLogoutAndRedirect } from '../../actions/auth';
import './SideMenu.scss';


class SideMenu extends React.Component {

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    goToIndex = () => {
        this.props.dispatch(routeActions.push('/'));
    };

    goToProtected = () => {
        this.props.dispatch(routeActions.push('/protected'));
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    render() {
        const homeClass = classNames({
            active: this.props.pathName === '/'
        });
        const protectedClass = classNames({
            active: this.props.pathName === '/protected'
        });

        return (
            <div className="navbar-default side-menu" role="navigation">
                <div className="navbar-collapse collapse">
                    <ul className="nav">
                        <li>
                            <a onClick={this.goToIndex} className={homeClass}>
                                <i className="fa fa-map-marker fa-fw"></i> Home</a>
                        </li>
                        <li>
                            <a onClick={this.goToProtected}
                               className={protectedClass}
                            >
                                <i className="fa fa-map fa-fw"></i> Protected
                            </a>
                        </li>
                        <li className="side-menu__category">
                            Multi Level
                        </li>
                        <li>
                            <a href="#">Item 1</a>
                        </li>
                        <li>
                            <a href="#">Item 2</a>
                        </li>

                        <li className="side-menu__category hidden-md hidden-lg">
                            User
                        </li>
                        <li>
                            <a className="hidden-md hidden-lg" href="#" onClick={this.logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div >
        );
    }
}

export default (SideMenu);
