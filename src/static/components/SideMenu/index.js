import React from 'react';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import './style.scss';

class SideMenu extends React.Component {

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
        const homeClass = classNames({
            active: this.props.pathName === '/'
        });
        const protectedClass = classNames({
            active: this.props.pathName === '/protected'
        });

        return (
            <div className="side-menu">
                <ul>
                    <li className={homeClass}
                        onClick={this.goToIndex}
                    >
                        <a>
                            <i className="fa fa-map-marker fa-fw"></i> Home
                        </a>
                    </li>
                    <li className={protectedClass}
                        onClick={this.goToProtected}
                    >
                        <a>
                            <i className="fa fa-map fa-fw"></i> Protected
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default (SideMenu);
