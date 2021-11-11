import React, { Component } from 'react';
import ReactTodoList from '@splunk/react-todo-list';

export default class IndexList extends Component {
    constructor(props) {
        super(props);
        this.state = { indexes: [] };
        this.fetchIndexes();
    }

    onCheck = itemId => {
        const indexes = this.state.indexes;
        const item = indexes.find(currentItem => currentItem.id === itemId);
        item.done = !item.done;
        this.setState({ indexes });
    };

    fetchIndexes() {
        fetch('/splunkd/services/data/indexes?output_mode=json', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                const indexes = data.entry.map((entry, index) => ({
                    id: index,
                    title: entry.name,
                    done: false,
                }));
                this.setState({ indexes });
            })
            .catch(e => {
                console.error('Error during index retrieval/parsing', e);
            });
    }

    render() {
        const indexes = this.state.indexes;
        return <ReactTodoList name="Index audit" items={indexes} onCheck={this.onCheck} />;
    }
}