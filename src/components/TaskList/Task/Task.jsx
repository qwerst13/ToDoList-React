import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Task.css';

export default class Task extends React.Component {
  static defaultProps = {
    id: Date.now().toString(),
    className: '',
    description: 'Empty!?',
    date: Date.now(),
    onDelete: () => {},
    onComplete: () => {},
    onEdit: () => {},
    finishEditing: () => {},
  };

  static propTypes = {
    id: PropTypes.number,
    className: PropTypes.oneOf(['', 'completed', 'editing']),
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
    onEdit: PropTypes.func,
    finishEditing: PropTypes.func,
  };

  updateInterval = 5000;

  constructor(props) {
    super(props);

    const {description, date} = props;

    this.state = {
      value: description,
      prevClass: '',
      timeToNow: formatDistanceToNow(date, { includeSeconds: true }),
    };
  }

  componentDidMount = () => {
    this.timerID = setInterval(() => this.tick(), this.updateInterval);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  tick = () => {
    const { date } = this.props;
    this.setState({
      timeToNow: formatDistanceToNow(date, { includeSeconds: true }),
    });
  };

  onEdit = () => {
    const { onEdit, id, className } = this.props;

    this.setState({prevClass: className});

    onEdit(id);
  }

  editTask = (event) => {
    const {value} = event.target;

    this.setState({ value });
  };

  finishEditing = (event) => {
    const { value, prevClass } = this.state;
    const { id, finishEditing } = this.props;
    // confirm changes - Enter
    if (event.keyCode === 13) {
      finishEditing(value, id, prevClass);
    }
  };

  render() {
    const { className, description, onDelete, onComplete, id } = this.props;
    const { timeToNow, value } = this.state;
    const isChecked = className === 'completed';

    return (
      <li className={className}>
        <div>
          <div className="view">
            <input onChange={() => onComplete(id)} className="toggle" type="checkbox" checked={isChecked} />
            <label>
              <span className="description">{description}</span>
              <span className="created">{timeToNow}</span>
            </label>
            <button type="button" onClick={this.onEdit} className="icon icon-edit">Edit</button>
            <button type="button" onClick={() => onDelete(id)} className="icon icon-destroy">Destroy</button>
          </div>
          <input onChange={this.editTask} onKeyDown={this.finishEditing} type="text" className="edit" value={value} />
        </div>
      </li>
    );
  }
}
