import * as React from 'react';

import { Footer } from '../Footer';
import { NewTaskForm } from '../NewTaskForm';
import { TaskList } from '../TaskList';

import { TodoModel } from '../../models/todo.model';
import { FilterModel } from '../../models/filter.model';

import './App.scss';

const { useState } = React;
export function App() {
  const [data, setData] = useState<TodoModel[]>([createTodoItem('Create your task')]);
  const [activeFilter, setActiveFilter] = useState<FilterModel>('All');

  const toDoCount = data.filter((item) => !item.isCompleted).length;

  function createTodoItem(value: string): TodoModel {
    return { id: Date.now(), isCompleted: false, isEdited: false, description: value, date: new Date() };
  }

  function deleteTask(id: number) {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  }

  function clearCompleted() {
    setData((prevData) => prevData.filter((item) => !item.isCompleted));
  }

  function filterTasks(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const { tagName, textContent } = event.target as HTMLElement;

    if (tagName === 'BUTTON') {
      setActiveFilter(textContent as FilterModel);
    }
  }

  function createTask(value: string) {
    const newTask = createTodoItem(value);

    setData((prevData) => [...prevData, newTask]);
  }

  function completeTask(id: number) {
    setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)));
  }

  function editTask(id: number) {
    setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, isEdited: !item.isEdited } : item)));
  }

  function finishEditing(value: string, id: number) {
    setData((prevData) => {
      const index = prevData.findIndex((item) => item.id === id);
      const newItem = { ...prevData[index], description: value, isEdited: false };

      return [...prevData.slice(0, index), newItem, ...prevData.slice(index + 1)];
    });
  }

  return (
    <div>
      <section className="todoapp">
        <NewTaskForm createTask={createTask} />
        <section className="main">
          <TaskList
            dataList={data}
            onDelete={deleteTask}
            onComplete={completeTask}
            onEdit={editTask}
            finishEditing={finishEditing}
            filterType={activeFilter}
          />
        </section>
      </section>
      <Footer toDoCount={toDoCount} filterTasks={filterTasks} clearCompleted={clearCompleted} selected={activeFilter} />
    </div>
  );
}
