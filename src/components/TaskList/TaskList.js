import React from 'react';

import Task from '../Task';

import './TaskList.css';

const TaskList = ( { dataList } ) => {
    const elements = dataList.map((element) => {
        const {id, className, ...elementProperties} = element;
        return (
            <li key={id} className={className}>
                <Task { ...elementProperties } />
            </li>
        );
    });
    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
};

export default TaskList;