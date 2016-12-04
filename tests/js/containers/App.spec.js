/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint import/no-named-default: 0 */

import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { default as AppConnected, AppNotConnected } from '../../../src/static/app';


describe(' App View Tests (Container):', () => {
    describe('Implementation:', () => {
        context('Empty state:', () => {
            let wrapper;
            const spies = {
                redirect: sinon.spy()
            };
            const props = {
                isAuthenticated: false,
                children: <div className="test-test"/>,
                dispatch: spies.redirect,
                pathName: '/'
            };

            beforeEach(() => {
                wrapper = shallow(<AppNotConnected {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have only one menu', () => {
                expect(wrapper.find('nav')).to.have.length(1);
            });

            it('should not have side-menu div', () => {
                expect(wrapper.find('side-menu')).to.have.length(0);
            });

            it('should have the children elements', () => {
                expect(wrapper.find('.test-test')).to.have.length(1);
            });

            it('should have one login button', () => {
                expect(wrapper.find('.js-login-button')).to.have.length(1);
            });

            it('should have one navbar brand and call a dispatch onClick event', () => {
                const link = wrapper.find('.navbar-brand');
                expect(link).to.have.length(1);

                link.simulate('click');
                expect(spies.redirect.calledOnce).to.equal(true);
            });

            it('should have one goToIndex link and call a dispatch onClick event', () => {
                const link = wrapper.find('.js-go-to-index-button');
                expect(link).to.have.length(1);

                link.simulate('click');
                expect(spies.redirect.calledTwice).to.equal(true);
            });
        });
        context('State with authentication:', () => {
            let wrapper;
            const spies = {
                redirect: sinon.spy(),
                willUnmount: sinon.spy()
            };
            const props = {
                isAuthenticated: true,
                children: <div className="test-test"/>,
                dispatch: spies.redirect,
                pathName: '/'
            };

            beforeEach(() => {
                wrapper = mount(<AppNotConnected {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have only one menu', () => {
                expect(wrapper.find('nav')).to.have.length(1);
            });

            it('should not have side-menu div', () => {
                expect(wrapper.find('side-menu')).to.have.length(0);
            });

            it('should have the children elements', () => {
                expect(wrapper.find('.test-test')).to.have.length(1);
            });

            it('should have one authLogout button and call a dispatch onClick event', () => {
                const button = wrapper.find('.js-logout-button');
                expect(button).to.have.length(1);

                button.simulate('click');
                expect(spies.redirect.calledOnce).to.equal(true);
            });

            it('should have one goToIndex link and call a dispatch onClick event', () => {
                const link = wrapper.find('.js-go-to-index-button');
                expect(link).to.have.length(1);

                link.simulate('click');
                expect(spies.redirect.calledTwice).to.equal(true);
            });

            it('should have one goToProtected link and call a dispatch onClick event', () => {
                const link = wrapper.find('.js-go-to-protected-button');
                expect(link).to.have.length(1);

                link.simulate('click');
                expect(spies.redirect.calledThrice).to.equal(true);
            });

            it('should unmount and remove resize event listener', () => {
                expect(spies.willUnmount.callCount).to.equal(0);
                wrapper.unmount();
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
                },
                routing: {
                    location: {
                        pathname: '/'
                    }
                }
            };
            const expectedActions = [];

            const middlewares = [thunk];
            const mockStore = configureStore(middlewares);
            const store = mockStore(state, expectedActions, done);

            const wrapper = mount(
                <AppConnected store={store}
                              location={{ pathname: '/' }}
                >
                    <div>for testing only</div>
                </AppConnected>);

            it('props', () => {
                expect(wrapper.node.renderedElement.props.isAuthenticated).to.equal(state.auth.isAuthenticated);
                expect(wrapper.node.renderedElement.props.pathName).to.equal('/');
            });
        });
    });
});
