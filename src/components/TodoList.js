import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ( {data} ) => {

    const listElements = data.map((item) => {

        const {id, ...itemProps} = item;

        return (
            <li key = { id }>
                <TodoListItem { ...itemProps } />
            </li>
        );
    });

    return (
        <ul>
            { listElements }
        </ul>
    )
};

export default TodoList;