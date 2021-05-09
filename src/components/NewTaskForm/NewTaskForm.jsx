import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.scss';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    createTask: () => {},
  };

  static propTypes = {
    createTask: PropTypes.func,
  };

  state = { value: '' };

  changeInputState = (event) => {
    const {value} = event.target;
    this.setState({ value });
  };

  createTask = (event) => {
    const {createTask} = this.props;
    const {value} = this.state;

    if (value.trim() === '') return;

    if (event.keyCode === 13) {
      createTask(value);
      this.setState({ value: '' });
    }
  };

  render() {
    const { value } = this.state;
    return (
      <header className="header">
        <h1>ToDo List</h1>
        <input
          onChange={this.changeInputState}
          onKeyDown={this.createTask}
          value={value}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
