import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import StopWatch from './StopWatch';
import './Task.scss';

export default class Task extends React.Component {
  static defaultProps = {
    id: Date.now().toString(),
    isCompleted: false,
    isEdited: false,
    description: 'Empty!?',
    date: Date.now(),
    onDelete: () => {},
    onComplete: () => {},
    onEdit: () => {},
    finishEditing: () => {},
    filterType: 'All',
  };

  static propTypes = {
    id: PropTypes.number,
    isCompleted: PropTypes.bool,
    isEdited: PropTypes.bool,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
    onEdit: PropTypes.func,
    finishEditing: PropTypes.func,
    filterType: PropTypes.string,
  };

  updateInterval = 5000;

  constructor(props) {
    super(props);

    const {description, date} = props;

    this.state = {
      value: description,
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

  editTask = (event) => {
    const {value} = event.target;

    this.setState({ value });
  };

  finishEditing = (event) => {
    const { value } = this.state;
    const { id, finishEditing } = this.props;
    // confirm changes - Enter
    if (event.keyCode === 13) {
      finishEditing(value, id);
    }
  };

  render() {
    const { isCompleted, isEdited, description, onDelete, onComplete, onEdit, id, filterType } = this.props;
    const { timeToNow, value } = this.state;
    const className = isEdited && 'editing' || isCompleted && 'completed' || '';
    let isHidden;

    switch (filterType) {
      case 'All': isHidden = false;
        break;
      case 'Active': isHidden = isCompleted;
        break;
      case 'Completed': isHidden = !isCompleted;
        break;
      default: isHidden = true;
    }

    return (
      <li className={className} hidden={isHidden}>
        <div>
          <div className="view">
            <input onChange={() => onComplete(id)} className="toggle" type="checkbox" checked={isCompleted}/>
            <div className="label">
              <div className="description">{description}</div>
              <div className="counters">
                <div className="created">{timeToNow}</div>
                <StopWatch />
              </div>
            </div>
            <button type="button" onClick={() => onEdit(id)} className="icon icon-edit">Edit</button>
            <button type="button" onClick={() => onDelete(id)} className="icon icon-destroy">Destroy</button>
          </div>
          <input onChange={this.editTask} onKeyDown={this.finishEditing} type="text" className="edit" value={value} />
        </div>
      </li>
    );
  }
}
