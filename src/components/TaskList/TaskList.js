import React from 'react';

import Task from './Task';

import './TaskList.css';

export default class TaskList extends React.Component {

    render() {
        const { dataList, onDelete, onComplete, onEdit, finishEditing } = this.props;
        const elements = dataList.map((element) => {
            const {id, ...elementProperties} = element;
            return (
                <Task
                    key={id}
                    id={id}
                    onDelete={ () => onDelete(id) }
                    onComplete={ () => onComplete(id) }
                    onEdit={  () => onEdit(id)  }
                    finishEditing={ finishEditing }
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