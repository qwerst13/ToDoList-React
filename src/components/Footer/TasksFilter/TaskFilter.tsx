import * as React from 'react';

import './TaskFilter.scss';
import { FilterModel } from '../../../models/filter.model';

interface TaskFilterProps {
  selected: FilterModel;
  filterTasks: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export function TaskFilter({ filterTasks, selected }: TaskFilterProps) {
  const buttonTypes: FilterModel[] = ['All', 'Active', 'Completed'];

  const buttons = buttonTypes.map((item) => {
    let className = '';
    if (item === selected) {
      className = 'selected';
    }

    return (
      <li key={item}>
        <button type="button" className={className}>
          {item}
        </button>
      </li>
    );
  });

  return (
    <ul onClick={filterTasks} className="filters">
      {buttons}
    </ul>
  );
}
