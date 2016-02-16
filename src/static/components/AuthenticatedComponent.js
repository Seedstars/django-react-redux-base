import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {

        static propTypes = {
            isAuthenticated: React.PropTypes.bool.isRequired,
            location: React.PropTypes.object.isRequired,
            dispatch: React.PropTypes.func.isRequired
        };

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            if (!this.props.isAuthenticated) {
                const redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(routeActions.push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            token: state.auth.token
        };
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
}
