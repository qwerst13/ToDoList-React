import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

import './Footer.scss';

const Footer = ({ filterTasks, selected, toDoCount, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">{toDoCount} items left</span>
    <TasksFilter selected={selected} filterTasks={filterTasks} />
    <button type="button" onClick={clearCompleted} className="clear-completed">
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  toDoCount: 0,
  selected: 'All',
  filterTasks: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  toDoCount: PropTypes.number,
  selected: PropTypes.oneOf(['All', 'Active', 'Completed']),
  filterTasks: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
