/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SideMenu from '../../../../src/static/components/SideMenu';


describe('SideMenu Tests (Component):', () => {
    describe('Implementation:', () => {
        context('Empty state:', () => {
            let wrapper;
            const spie = sinon.spy();
            const props = {
                dispatch: spie,
                pathName: '/'
            };

            beforeEach(() => {
                wrapper = shallow(<SideMenu {...props}/>);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have side-menu div', () => {
                expect(wrapper.find('.side-menu')).to.have.length(1);
            });

            it('should call dispatch on a click', () => {
                const links = wrapper.find('li');

                links.at(0).simulate('click');
                links.at(1).simulate('click');

                expect(spie.calledTwice).to.equal(true);
            });
        });
    });
});
