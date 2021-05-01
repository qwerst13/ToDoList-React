import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

import './TaskList.css';

export default class TaskList extends React.Component {

    static defaultProps = {
        dataList: [],
        onDelete: () => {},
        onComplete: () => {},
        onEdit: () => {},
        finishEditing: () => {}
    };

    static propTypes = {
        dataList: PropTypes.arrayOf(PropTypes.object),
        onDelete: PropTypes.func,
        onComplete: PropTypes.func,
        onEdit: PropTypes.func,
        finishEditing: PropTypes.func
    };

    render() {
        const { dataList, ...handlers } = this.props;
        const elements = dataList.map((element) => {
            const { ...elementProperties } = element;

            return (
                <Task
                    key={ elementProperties.id }
                    { ...handlers }
                    { ...elementProperties }
                />
            );
        });

        return (
            <ul className="todo-list">
                { elements }
            </ul>
        );
    }
};