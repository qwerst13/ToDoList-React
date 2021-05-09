import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.scss';

const TaskFilter = ({ filterTasks, selected }) => {
    const buttonTypes = ['All', 'Active', 'Completed'];

    const buttons = buttonTypes.map((item) => {
      let className = '';
      if (item === selected) className = 'selected';

      return (
        <li key={item}>
          <button type="button" className={className}>{item}</button>
        </li>
      );
    });

    return (
      <ul onClick={filterTasks} onKeyDown={filterTasks} className="filters">
        {buttons}
      </ul>
    );
}

TaskFilter.defaultProps = {
  selected: '',
  filterTasks: () => {},
};

TaskFilter.propTypes = {
  selected: PropTypes.oneOf(['All', 'Active', 'Completed']),
  filterTasks: PropTypes.func,
};

export default TaskFilter;
