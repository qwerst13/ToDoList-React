import React from 'react';

import './TaskFilter.css';

const TaskFilter = () => {
    return (
        <ul className="filters">
            <li>
                <button className="selected">All</button>
            </li>
            <li>
                <button>Active</button>
            </li>
            <li>
                <button>Completed</button>
            </li>
        </ul>
    );
};

export default TaskFilter;