import * as React from 'react';

import { Task } from './Task';

import { TodoModel } from '../../models/todo.model';
import { FilterModel } from '../../models/filter.model';

import './TaskList.scss';

interface TaskListProps {
  dataList: TodoModel[];
  filterType: FilterModel;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number) => void;
  finishEditing: (value: string, id: number) => void;
}

export function TaskList({ dataList = [], filterType = 'All', ...handlers }: TaskListProps) {
  const elements = dataList.map((element) => {
    const { ...elementProperties } = element;

    return <Task key={elementProperties.id} {...handlers} {...elementProperties} filterType={filterType} />;
  });

  return <ul className="todo-list">{elements}</ul>;
}
