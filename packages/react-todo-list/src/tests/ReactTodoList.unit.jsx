/* eslint-env jest */

import React from 'react';
import { assert } from 'chai';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapterReact16 from 'enzyme-adapter-react-16';
import ReactTodoList from '../ReactTodoList';
import Heading from '@splunk/react-ui/Heading';
import Menu from '@splunk/react-ui/Menu';
import Clickable from '@splunk/react-ui/Clickable';

// This sets up the enzyme adapter
const adapter = new EnzymeAdapterReact16();
Enzyme.configure({ adapter });

describe('ReactTodoList', () => {
    it('renders with default name', () => {
        const wrapper = mount(<ReactTodoList />);
        assert.include(wrapper.find(Heading).text(), 'My Task List');
        wrapper.unmount();
    });

    it('renders with custom name', () => {
        const wrapper = mount(<ReactTodoList name="My Special Tasks" />);
        assert.include(wrapper.find(Heading).text(), 'My Special Tasks');
        wrapper.unmount();
    });

    it('selects item on mouse click', () => {
        const wrapper = mount(<ReactTodoList />);
        assert.isFalse(wrapper.find(Menu.Item).at(1).prop('selected'));
        wrapper.find(Menu.Item).at(1).find(Clickable).simulate('click');
        assert.isTrue(wrapper.find(Menu.Item).at(1).prop('selected'));

        wrapper.unmount();
    })

});
