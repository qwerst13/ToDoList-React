import React from 'react';

import Task from './Task';

import './TaskList.css';



const TaskList = ( { dataList, onDelete, onComplete, onEdit, finishEditing } ) => {
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
};

export default TaskList;