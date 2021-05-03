import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

import './TaskList.css';

const TaskList = ({ dataList, ...handlers }) => {
    const elements = dataList.map((element) => {
      const { ...elementProperties } = element;

      return <Task key={elementProperties.id} {...handlers} {...elementProperties} />;
    });

    return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  dataList: [],
  onDelete: () => {},
  onComplete: () => {},
  onEdit: () => {},
  finishEditing: () => {},
};

TaskList.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  finishEditing: PropTypes.func,
};

export default TaskList;
