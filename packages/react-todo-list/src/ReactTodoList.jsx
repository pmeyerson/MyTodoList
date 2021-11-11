import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledContainer } from './ReactTodoListStyles';

import Heading from '@splunk/react-ui/Heading';
import Menu from '@splunk/react-ui/Menu';

class ReactTodoList extends Component {
    static propTypes = {
        name: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        onCheck: PropTypes.func.isRequired,
    };

    static defaultProps = {
        name: 'My Task List',
    };

    constructor(props) {
        super(props);
        this.items = {
            items: [
                { id: 1, title: 'My first task', done: true },
                { id: 2, title: 'My second task', done: false },
                { id: 3, title: 'My third task', done: false },
            ],
        };
    }

    handleClick(index) {
        const item = this.props.items[index];
        this.props.onCheck(item.id);
    }

    render() {
        return (
            <StyledContainer>
                <Heading level={1}>{this.props.name}</Heading>
                <Menu>
                    {this.props.items.map((item, index) => (
                        <Menu.Item
                            selectable
                            selected={item.done}
                            onClick={() => this.handleClick(index)}
                            key={item.id}
                        >
                            {item.title}
                        </Menu.Item>
                    ))}
                </Menu>
            </StyledContainer>
        );
    }
}

export default ReactTodoList;
