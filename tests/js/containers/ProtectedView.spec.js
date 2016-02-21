import React from 'react';
import sinon from 'sinon';
import nock from 'nock';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ProtectedViewNotConnected } from '../../../src/static/containers/ProtectedView';
import { default as ProtectedViewConnected } from '../../../src/static/containers/ProtectedView';

import * as TYPES from '../../../src/static/constants';
import { SERVER_URL } from '../../../src/static/utils/config';


describe(' Protected View Tests (Container):', () => {
    describe('Implementation:', () => {
        context('Empty state:', () => {
            let wrapper;

            const spies = {
                dataFetchProtectedData: sinon.spy()
            };
            const props = {
                isFetching: true,
                data: 'some random secret data that has to be available',
                token: 'token',
                actions: {
                    dataFetchProtectedData: spies.dataFetchProtectedData
                }
            };

            beforeEach(() => {
                wrapper = shallow(<ProtectedViewNotConnected {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });
            it('should have one h1', () => {
                expect(wrapper.find('h1')).to.have.length(1);
            });
            it('should call actions.fetchProtectedData', () => {
                expect(spies.dataFetchProtectedData.calledWith('token')).to.eql(true);
            });
        });

        context('State with data:', () => {
            let wrapper;
            const props = {
                isFetching: false,
                data: 'some data',
                token: 'token',
                actions: {
                    dataFetchProtectedData: () => {
                        return null;
                    }
                }
            };

            beforeEach(() => {
                wrapper = shallow(<ProtectedViewNotConnected {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have one h1 with "Welcome back!"', () => {
                const h1 = wrapper.find('h1');

                expect(h1).to.have.length(1);
                expect(h1.text()).to.equal('Welcome back!');
            });

            it('should have one div with class .protected__protected-data with  "Data from server: {props.data}"',
                () => {
                    const div = wrapper.find('.protected__protected-data');

                    expect(div).to.have.length(1);
                    expect(div.text()).to.equal('Data from server:some data');
                });
        });
    });

    describe('Store Integration:', () => {
        context('State map:', (done) => {
            nock(SERVER_URL)
                .get('/api/v1/getdata/')
                .reply(200, {
                    data: 'data'
                });

            const state = {
                auth: {
                    token: 'token',
                    userName: 'a@a.com',
                    isAuthenticated: true,
                    isAuthenticating: false,
                    statusText: 'You have been successfully logged in.'
                },
                data: {
                    data: 'some random secret data that has to be available',
                    isFetching: true
                }

            };
            const expectedActions = [
                {
                    type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
                },
                {
                    type: TYPES.DATA_RECEIVE_PROTECTED_DATA,
                    payload: {
                        data: 'data'
                    }
                }
            ];

            const middlewares = [thunk];
            const mockStore = configureStore(middlewares);
            const store = mockStore(state, expectedActions, done);

            // Had to pass token as a prop because it normally is passed down from the AuthenticaedComponent.js
            const wrapper = mount(<ProtectedViewConnected store={store} token={state.auth.token}/>);

            it('props', () => {
                expect(wrapper.node.renderedElement.props.isFetching).to.equal(state.data.isFetching);
                expect(wrapper.node.renderedElement.props.data).to.equal(state.data.data);
            });

            it('actions', () => {
                expect(wrapper.node.renderedElement.props.actions.dataFetchProtectedData).to.not.equal(undefined);
            });

            nock.cleanAll();
        });
    });
});
