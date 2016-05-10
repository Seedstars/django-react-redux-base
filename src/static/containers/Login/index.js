import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';


class LoginView extends React.Component {

    static propTypes = {
        isAuthenticating: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        actions: React.PropTypes.object.isRequired,
        location: React.PropTypes.object // this comes from react-router, not required
    };

    constructor(props) {
        super(props);

        const redirectRoute = this.props.location ? this.props.location.query.next || '/' : '/';
        this.state = {
            email: '',
            password: '',
            redirectTo: redirectRoute
        };
    }

    login = (e) => {
        e.preventDefault();
        this.props.actions.authLoginUser(this.state.email, this.state.password, this.state.redirectTo);
    };

    handleInputChange = (e, state) => {
        this.setState({
            [state]: e.currentTarget.value
        });
    };

    render() {
        return (
            <div className="col-xs-12 col-md-6 col-md-offset-3">
                <h3>Log in to view protected content!</h3>
                <p>Hint: a@a.com / qw</p>
                {this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : ''}
                <form role="form">
                    <div className="form-group">
                        <input type="text"
                               className="form-control input-lg"
                               placeholder="Email"
                               onChange={(e) => { this.handleInputChange(e, 'email'); }}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                               className="form-control input-lg"
                               placeholder="Password"
                               onChange={(e) => { this.handleInputChange(e, 'password'); }}
                        />
                    </div>
                    <button type="submit"
                            className="btn btn-lg"
                            disabled={this.props.isAuthenticating}
                            onClick={this.login}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
export { LoginView as LoginViewNotConnected };
