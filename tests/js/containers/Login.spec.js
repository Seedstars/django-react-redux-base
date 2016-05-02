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
                statusText: null
            };

            beforeEach(() => {
                wrapper = mount(<LoginViewNotConnected {...props}/>);
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
                    email: 'a@a.com',
                    password: '123'
                });

                wrapper.find('button').simulate('click');
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
                statusText: 'Authentication Error: 401 UNAUTHORIZED'
            };

            beforeEach(() => {
                wrapper = mount(<LoginViewNotConnected {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have one div with class alert alert-info ', () => {
                const div = wrapper.find('div.alert-info');

                expect(div).to.have.length(1);
                expect(div.text()).to.equal(props.statusText);
            });

            it('should have two inputs ([text,password]) and one button ', () => {
                const input = wrapper.find('input');
                expect(input).to.have.length(2);
                expect(input.at(0).prop('type')).to.equal('text');
                expect(input.at(1).prop('type')).to.equal('password');

                expect(wrapper.find('button')).to.have.length(1);
            });

            it('should call prop action with 3 arguments on button click', () => {
                // There are two ways of changing input values

                // ONE: if input not linked to components state
                const inputs = wrapper.find('input');
                inputs.at(0).node.value = 'a@a.com';
                inputs.at(0).simulate('change');
                inputs.at(1).node.value = '123';
                inputs.at(1).simulate('change');

                // TWO: if inputs linked to component state
                wrapper.setState({
                    email: 'a@a.com',
                    password: '123'
                });

                wrapper.find('button').simulate('click');
                expect(spies.authLoginUser.calledWith('a@a.com', '123', '/')).to.equal(true);
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

            const wrapper = mount(<LoginViewConnected store={store}/>);

            it('props', () => {
                expect(wrapper.node.renderedElement.props.isAuthenticating).to.equal(state.auth.isAuthenticating);
                expect(wrapper.node.renderedElement.props.statusText).to.equal(state.auth.statusText);
            });

            it('actions', () => {
                expect(wrapper.node.renderedElement.props.actions.authLoginUser).to.not.equal(undefined);
            });

            nock.cleanAll();
        });
    });
});
