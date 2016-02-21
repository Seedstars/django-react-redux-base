import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { HomeViewNotConnected } from '../../../src/static/containers/HomeView';
import { default as HomeViewConnected } from '../../../src/static/containers/HomeView';


describe('Home View Tests (Container):', () => {
    describe('Implementation:', () => {
        context('Empty state:', () => {
            let wrapper;
            const props = {
                statusText: null
            };

            beforeEach(() => {
                wrapper = shallow(<HomeViewNotConnected {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have one h1 and one p ', () => {
                expect(wrapper.find('h1')).to.have.length(1);
                expect(wrapper.find('p')).to.have.length(1);
            });
        });

        context('State with statusText:', () => {
            let wrapper;
            const props = {
                statusText: 'Some status text'
            };

            beforeEach(() => {
                wrapper = shallow(<HomeViewNotConnected {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have one h1, one p and one alert alert-info div ', () => {
                expect(wrapper.find('h1')).to.have.length(1);
                expect(wrapper.find('p')).to.have.length(1);

                const div = wrapper.find('div.alert-info');
                expect(div).to.have.length(1);
                expect(div.text()).to.equal(props.statusText);
            });
        });
    });

    describe('Store Integration:', () => {
        context('State map:', (done) => {
            const state = {
                auth: {
                    token: 'token',
                    userName: 'a@a.com',
                    isAuthenticated: true,
                    isAuthenticating: false,
                    statusText: 'You have been successfully logged in.'
                }
            };
            const expectedActions = [];
            const middlewares = [thunk];
            const mockStore = configureStore(middlewares);
            const store = mockStore(state, expectedActions, done);

            const wrapper = mount(<HomeViewConnected store={store}/>);

            it('props', () => {
                expect(wrapper.node.renderedElement.props.statusText).to.equal(state.auth.statusText);
            });
        });
    });
});
