import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/auth';

const Form = t.form.Form;

const Register = t.struct({
    email: t.String,
    password: t.String,
    firstName: t.String,
    lastName: t.String,
});

const RegisterFormOptions = {
    auto: 'placeholders',
    fields: {
        password: {
            type: 'password',
        },
    },
};

class RegisterView extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        statusText: PropTypes.string,
        actions: PropTypes.shape({
            authRegisterUser: PropTypes.func.isRequired,
        }).isRequired,
        location: PropTypes.shape({
            search: PropTypes.string.isRequired,
        }),
    };

    static defaultProps = {
        statusText: '',
        location: null,
    };

    constructor(props) {
        super(props);

        const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/';
        this.state = {
            formValues: {
                email: '',
                password: '',
            },
            redirectTo: redirectRoute,
        };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    extractRedirect = (string) => {
        const match = string.match(/next=(.*)/);
        return match ? match[1] : '/';
    };

    register = (e) => {
        e.preventDefault();
        const value = this.registerForm.getValue();
        if (value) {
            this.props.actions.authRegisterUser(
                value.email,
                value.password,
                value.firstName,
                value.lastName,
                this.state.redirectTo,
            );
        }
    };

    render() {
        let statusText = null;
        if (this.props.statusText) {
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
                'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0,
            });

            statusText = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container login">
                <h1 className="text-center">Register</h1>
                <div className="login-container margin-top-medium">
                    {statusText}
                    <form onSubmit={this.register}>
                        <Form ref={(ref) => {
                            this.registerForm = ref;
                        }}
                        type={Register}
                        options={RegisterFormOptions}
                        value={this.state.formValues}
                        onChange={this.onFormChange}
                        />
                        <button disabled={this.props.isAuthenticating}
                            type="submit"
                            className="btn btn-default btn-block"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };
