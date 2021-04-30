import React from 'react';

import TasksFilter from './TasksFilter';

import './Footer.css';

export default class Footer extends React.Component {

    render() {
        const { filterTasks, selected, toDoCount, clearCompleted } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{toDoCount} items left</span>
                <TasksFilter selected={selected} filterTasks={filterTasks}/>
                <button onClick={clearCompleted} className="clear-completed">Clear completed</button>
            </footer>
        );
    }
};