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
        date: PropTypes.object,
        onDelete: PropTypes.func,
        onComplete: PropTypes.func,
        onEdit: PropTypes.func,
        finishEditing: PropTypes.func
    };

    state = {
        value: this.props.description,
        timeToNow: formatDistanceToNow(this.props.date, {includeSeconds: true})
    };

    updateInterval = 5000;

    componentDidMount = () => {
        this.timerID = setInterval(() => this.tick(), this.updateInterval);
    };

    componentWillUnmount = () => {
        clearInterval(this.timerID);
    };

    tick = () => {
        this.setState({
            timeToNow: formatDistanceToNow(this.props.date, {includeSeconds: true})
        });
    };

    editTask = (e) => {
        this.setState({value: e.target.value})
    };

    finishEditing = (e) => {
        //confirm changes - Enter
        if (e.keyCode===13){
            this.props.finishEditing(this.state.value, this.props.id)
        }
    };

    render () {
        const {className, description, onDelete, onComplete, onEdit, id} = this.props;
        const isChecked = (className==='completed');

        return (

            <li className={className}>
                <div>
                    <div className="view">
                        <input onChange={ () => onComplete(id) } className="toggle" type="checkbox" checked={ isChecked } />
                        <label>
                            <span className="description">{ description }</span>
                            <span className="created">{ this.state.timeToNow }</span>
                        </label>
                        <button onClick={ () => onEdit(id) } className="icon icon-edit"/>
                        <button onClick={ () => onDelete(id) } className="icon icon-destroy"/>
                    </div>
                    <input
                        onChange={ this.editTask }
                        onKeyDown={ this.finishEditing }
                        type="text"
                        className="edit"
                        value={ this.state.value }
                    />
                </div>
            </li>
        );
    }
}