import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';

class ProtectedView extends React.Component {

    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.string,
        token: React.PropTypes.string.isRequired,
        actions: React.PropTypes.shape({
            dataFetchProtectedData: React.PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        data: ''
    };

    // Note: have to use componentWillMount, if I add this in constructor will get error:
    // Warning: setState(...): Cannot update during an existing state transition (such as within `render`).
    // Render methods should be a pure function of props and state.
    componentWillMount() {
        const token = this.props.token;
        this.props.actions.dataFetchProtectedData(token);
    }

    render() {
        return (
            <div className="protected">
                <div className="container">
                    <h1 className="text-center margin-bottom-medium">Protected</h1>
                    {this.props.isFetching === true ?
                        <p className="text-center">Loading data...</p>
                        :
                        <div>
                            <p>Data received from the server:</p>
                            <div className="margin-top-small">
                                <div className="alert alert-info">
                                    <b>{this.props.data}</b>
                                </div>
                            </div>
                            <div className="margin-top-medium">
                                <h5 className="margin-bottom-small"><b>How does this work?</b></h5>
                                <p className="margin-bottom-small">
                                    On the <code>componentWillMount</code> method of the
                                    &nbsp;<code>ProtectedView</code> component, the action
                                    &nbsp;<code>dataFetchProtectedData</code> is called. This action will first
                                    dispatch a <code>DATA_FETCH_PROTECTED_DATA_REQUEST</code> action to the Redux
                                    store. When an action is dispatched to the store, an appropriate reducer for
                                    that specific action will change the state of the store. After that it will then
                                    make an asynchronous request to the server using
                                    the <code>isomorphic-fetch</code> library. On its
                                    response, it will dispatch the <code>DATA_RECEIVE_PROTECTED_DATA</code> action
                                    to the Redux store. In case of wrong credentials in the request, the&nbsp;
                                    <code>AUTH_LOGIN_USER_FAILURE</code> action will be dispatched.
                                </p>
                                <p>
                                    Because the <code>ProtectedView</code> is connected to the Redux store, when the
                                    value of a property connected to the view is changed, the view is re-rendered
                                    with the new data.
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data,
        isFetching: state.data.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView);
export { ProtectedView as ProtectedViewNotConnected };
