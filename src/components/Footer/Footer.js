import React from 'react';

import TasksFilter from './TasksFilter';

import './Footer.css';

const Footer = ({filterTasks, selected, toDoCount, clearCompleted}) => {


    return (
        <footer className="footer">
            <span className="todo-count">{toDoCount} items left</span>
            <TasksFilter selected={selected} filterTasks={filterTasks}/>
            <button onClick={clearCompleted} className="clear-completed">Clear completed</button>
        </footer>
    );
};

export default Footer;