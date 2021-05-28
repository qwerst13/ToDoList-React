import React from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './App.scss';

export default class App extends React.Component {
  state = {
    data: [
      this.createTodoItem('Create your task'),
    ],
    activeFilter: 'All',
  };

  deleteTask = (id) => {
    this.setState(({ data }) => {
      const newData = data.filter((item) => item.id !== id);

      return { data: newData };
    });
  };

  clearCompleted = () => {
    this.setState(({data}) => {
      const newData = data.filter((item) => !item.isCompleted);

      return {data: newData}
    });
  };

  filterTasks = (event) => {
    const {tagName, textContent} = event.target;

    if (tagName === 'BUTTON') {
      this.setState({ activeFilter: textContent });
    }
  };

  createTask = (value) => {
    const newTask = this.createTodoItem(value);

    this.setState(({ data }) => ({ data: [...data, newTask] }));
  };

  completeTask = (id) => {
    this.setState(({ data }) => {
      const newData = data.map((item) => (item.id === id) ? {...item, isCompleted: !item.isCompleted} : item);

      return { data: newData };
    });
  };

  editTask = (id) => {
    this.setState(({ data }) => {
      const newData = data.map((item) => (item.id === id) ? {...item, isEdited: !item.isEdited} : item);

      return { data: newData };
    });
  };

  finishEditing = (value, id) => {
    this.setState(({data}) => {
      const index = data.findIndex((item) => item.id === id);
      const newItem = { ...data[index], description: value, isEdited: false };

      return { data: [...data.slice(0, index), newItem, ...data.slice(index + 1)] };
    });
  };

  createTodoItem (value) {
    return {id: Date.now(), isCompleted: false, isEdited: false, description: value, date: new Date(),}
  };

  render() {
    const { data, activeFilter } = this.state;

    const toDoCount = data.filter((item) => !item.isCompleted).length;

    return (
      <div>
        <section className="todoapp">
          <NewTaskForm createTask={this.createTask} />
          <section className="main">
            <TaskList
              dataList={data}
              onDelete={this.deleteTask}
              onComplete={this.completeTask}
              onEdit={this.editTask}
              finishEditing={this.finishEditing}
              filterType={activeFilter}
            />
          </section>
        </section>
        <Footer
          toDoCount={toDoCount}
          filterTasks={this.filterTasks}
          clearCompleted={this.clearCompleted}
          selected={activeFilter}
        />
      </div>
    );
  }
}
