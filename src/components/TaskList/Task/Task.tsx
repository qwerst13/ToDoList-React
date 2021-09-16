import * as React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { StopWatch } from './StopWatch';

import { TodoModel } from '../../../models/todo.model';
import { FilterModel } from '../../../models/filter.model';

import './Task.scss';

interface TaskProps extends TodoModel {
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number) => void;
  finishEditing: (value: string, id: number) => void;
  filterType: FilterModel;
}

const { useState, useEffect } = React;
export function Task({ isCompleted, isEdited, description, id, date, onDelete, onComplete, onEdit, finishEditing, filterType }: TaskProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [timeToNow, setTimeToNow] = useState(formatDistanceToNow(date, { includeSeconds: true }));

  const updateInterval = 5000;

  useEffect(() => {
    setInputValue(description);
    setTimeToNow(formatDistanceToNow(date, { includeSeconds: true }));

    const timerID = setInterval(() => tick(), updateInterval);

    return () => clearInterval(timerID);
  }, []);

  const className = (isEdited && 'editing') || (isCompleted && 'completed') || '';
  let isHidden;

  switch (filterType) {
    case 'All':
      isHidden = false;
      break;
    case 'Active':
      isHidden = isCompleted;
      break;
    case 'Completed':
      isHidden = !isCompleted;
      break;
    default:
      isHidden = true;
  }

  function tick() {
    setTimeToNow(formatDistanceToNow(date, { includeSeconds: true }));
  }

  function editTask(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setInputValue(value);
  }

  function finishTaskHandler(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      finishEditing(inputValue!, id);
    }
  }

  return (
    <li className={className} hidden={isHidden}>
      <div>
        <div className="view">
          <input onChange={() => onComplete(id)} className="toggle" type="checkbox" checked={isCompleted} />
          <div className="label">
            <div className="description">{description}</div>
            <div className="counters">
              <div className="created">{timeToNow}</div>
              <StopWatch />
            </div>
          </div>
          <button type="button" onClick={() => onEdit(id)} className="icon icon-edit">
            Edit
          </button>
          <button type="button" onClick={() => onDelete(id)} className="icon icon-destroy">
            Destroy
          </button>
        </div>
        <input onChange={editTask} onKeyDown={finishTaskHandler} type="text" className="edit" value={inputValue} />
      </div>
    </li>
  );
}
