import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

import './TaskList.scss';

const TaskList = ({ dataList, filterType, ...handlers }) => {
  const elements = dataList.map((element) => {
    const { ...elementProperties } = element;

    return <Task key={elementProperties.id} {...handlers} {...elementProperties} filterType={filterType} />;
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  dataList: [],
  filterType: 'All',
  onDelete: () => {},
  onComplete: () => {},
  onEdit: () => {},
  finishEditing: () => {},
};

TaskList.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object),
  filterType: PropTypes.string,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  finishEditing: PropTypes.func,
};

export default TaskList;
