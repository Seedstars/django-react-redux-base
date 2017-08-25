/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint import/no-named-default: 0 */

import React from 'react';
import sinon from 'sinon';
import nock from 'nock';
import { expect } from 'chai';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { default as LoginViewConnected, LoginViewNotConnected } from '../../../src/static/containers/Login';

import * as TYPES from '../../../src/static/constants';
import { SERVER_URL } from '../../../src/static/utils/config';

describe('Login View Tests (Container):', () => {
    describe('Implementation:', () => {
        context('Empty State:', () => {
            let wrapper;
            const spies = {
                authLoginUser: sinon.spy()
            };
            const props = {
                actions: {
                    authLoginUser: spies.authLoginUser
                },
                isAuthenticating: false,
                isAuthenticated: false,
                statusText: null,
                dispatch: () => {}
            };

            beforeEach(() => {
                wrapper = mount(<LoginViewNotConnected {...props} />);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have two inputs ([text,password]) and one button ', () => {
                const input = wrapper.find('input');

                expect(input).to.have.length(2);
                expect(input.at(0).prop('type')).to.equal('text');
                expect(input.at(1).prop('type')).to.equal('password');
            });

            it('should call prop action with 3 arguments on button click', () => {
                wrapper.setState({
                    formValues: {
                        email: 'a@a.com',
                        password: '123'
                    },
                    redirectTo: '/'
                });

                wrapper.find('form').simulate('submit');
                expect(spies.authLoginUser.calledWith('a@a.com', '123', '/')).to.equal(true);
            });
        });
        context('Wrong login state:', () => {
            let wrapper;
            const spies = {
                authLoginUser: sinon.spy()
            };
            const props = {
                actions: {
                    authLoginUser: spies.authLoginUser
                },
                isAuthenticating: false,
                isAuthenticated: false,
                dispatch: () => {},
                statusText: 'Authentication Error: 401 UNAUTHORIZED'
            };

            beforeEach(() => {
                wrapper = mount(<LoginViewNotConnected {...props} />);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have one div with class alert alert-danger', () => {
                const div = wrapper.find('div.alert-danger');

                expect(div).to.have.length(1);
                expect(div.text()).to.equal(props.statusText);
            });

            it('should have two inputs ([text,password]) and one button', () => {
                const input = wrapper.find('input');
                expect(input).to.have.length(2);
                expect(input.at(0).prop('type')).to.equal('text');
                expect(input.at(1).prop('type')).to.equal('password');

                expect(wrapper.find('button')).to.have.length(1);
            });

            it('should call prop action with 3 arguments on button click', () => {
                wrapper.setState({
                    formValues: {
                        email: 'a@a.com',
                        password: '123'
                    },
                    redirectTo: '/'
                });

                wrapper.find('form').simulate('submit');
                expect(spies.authLoginUser.calledWith('a@a.com', '123', '/')).to.equal(true);
            });

            it('should update state on form change', () => {
                wrapper.setState({
                    formValues: {
                        email: 'a@a.com',
                        password: '123'
                    },
                    redirectTo: '/'
                });

                const inputEmail = wrapper.find('input').at(0);
                inputEmail.simulate('change', { target: { value: 'b@b.com' } });

                expect(wrapper.state()).to.eql({
                    formValues: {
                        email: 'b@b.com',
                        password: '123'
                    },
                    redirectTo: '/'
                });
            });
        });
    });

    describe('Store Integration:', () => {
        context('State map:', (done) => {
            nock(SERVER_URL)
                .post('/api/v1/accounts/login/')
                .reply(200, {
                    statusText: 'some text'
                });

            const state = {
                auth: {
                    token: 'token',
                    userName: 'a@a.com',
                    isAuthenticated: true,
                    isAuthenticating: false,
                    statusText: 'You have been successfully logged in.'
                }
            };
            const expectedActions = [
                {
                    type: TYPES.AUTH_LOGIN_USER_SUCCESS,
                    payload: {
                        auth: {}
                    }
                }, {
                    type: TYPES.AUTH_LOGIN_USER_FAILURE,
                    payload: {
                        status: null,
                        statusText: null
                    }
                },
                {
                    type: TYPES.AUTH_LOGIN_USER_REQUEST
                },
                {
                    type: TYPES.AUTH_LOGOUT_USER
                }
            ];

            const middlewares = [thunk];
            const mockStore = configureStore(middlewares);
            const store = mockStore(state, expectedActions, done);

            const wrapper = mount(<LoginViewConnected store={store} />);

            it('should have one div with class alert alert-success', () => {
                const div = wrapper.find('div.alert-success');

                expect(div).to.have.length(1);
                expect(div.text()).to.equal(wrapper.node.selector.props.statusText);
            });

            it('props', () => {
                expect(wrapper.node.selector.props.isAuthenticating).to.equal(state.auth.isAuthenticating);
                expect(wrapper.node.selector.props.statusText).to.equal(state.auth.statusText);
            });

            it('actions', () => {
                expect(wrapper.node.selector.props.actions.authLoginUser).to.not.equal(undefined);
            });

            nock.cleanAll();
        });
    });
});
