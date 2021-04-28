import React from 'react';

import Task from '../Task';

import './TaskList.css';



const TaskList = ( { dataList } ) => {
    const elements = dataList.map((element) => {
        const {id, ...elementProperties} = element;
        return (
                <Task key={id} { ...elementProperties } />
        );
    });
    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
};

export default TaskList;