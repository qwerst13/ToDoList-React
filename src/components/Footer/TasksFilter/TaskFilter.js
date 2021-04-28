import React from 'react';

import './TaskFilter.css';

const TaskFilter = ({filterTasks, selected}) => {
    const buttonTypes = ['All', 'Active', 'Completed'];
    const buttons = buttonTypes.map((item) => {
        let className = '';
        if (item === selected) className = 'selected';
        return (
            <li key={item}>
                <button className={className}>{item}</button>
            </li>
        )
    });

        return (
            <ul onClick={filterTasks} className="filters">
                {buttons}
            </ul>
        );
};

export default TaskFilter;

