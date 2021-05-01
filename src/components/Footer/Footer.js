import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

import './Footer.css';

export default class Footer extends React.Component {

    static defaultProps = {
        toDoCount: 0,
        selected: 'All',
        filterTasks: () => {},
        clearCompleted: () => {}
    };

    static propTypes = {
        toDoCount: PropTypes.number,
        selected: PropTypes.oneOf(['All', 'Active', 'Completed']),
        filterTasks: PropTypes.func,
        clearCompleted: PropTypes.func
    };

    render() {
        const { filterTasks, selected, toDoCount, clearCompleted } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{ toDoCount } items left</span>
                <TasksFilter selected={ selected } filterTasks={ filterTasks }/>
                <button onClick={ clearCompleted } className="clear-completed">Clear completed</button>
            </footer>
        );
    }
};