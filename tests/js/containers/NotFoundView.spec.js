import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NotFoundView from '../../../src/static/containers/NotFoundView';


describe('NotFound View Tests (Container):', () => {
    describe('Implementation:', () => {
        context('Empty state:', () => {
            let wrapper;
            const props = {};

            beforeEach(() => {
                wrapper = shallow(<NotFoundView {...props} />);
            });

            it('should render correctly', () => {
                return expect(wrapper).to.be.ok;
            });

            it('should have one h1', () => {
                expect(wrapper.find('h1')).to.have.length(1);
            });
        });
    });
});
