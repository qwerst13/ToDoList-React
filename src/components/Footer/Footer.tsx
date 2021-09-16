import * as React from 'react';

import { TaskFilter } from './TasksFilter';

import { FilterModel } from '../../models/filter.model';

import './Footer.scss';

interface FooterProps {
  selected: FilterModel;
  toDoCount: number;
  filterTasks: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  clearCompleted: () => void;
}

export function Footer({ filterTasks, selected = 'All', toDoCount = 0, clearCompleted }: FooterProps) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDoCount} items left</span>
      <TaskFilter selected={selected} filterTasks={filterTasks} />
      <button type="button" onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
