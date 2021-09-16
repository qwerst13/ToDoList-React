import * as React from 'react';

import './NewTaskForm.scss';

interface NewTaskFormProps {
  createTask: (value: string) => void;
}

const { useState } = React;
export function NewTaskForm({ createTask }: NewTaskFormProps) {
  const [inputValue, setInputValue] = useState('');

  function changeInputState(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setInputValue(value);
  }

  function createTaskHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (inputValue.trim() === '') return;

    if (event.key === 'Enter') {
      createTask(inputValue);
      setInputValue('');
    }
  }

  return (
    <header className="header">
      <h1>ToDo List</h1>
      <input onChange={changeInputState} onKeyDown={createTaskHandler} value={inputValue} className="new-todo" placeholder="What needs to be done?" />
    </header>
  );
}
