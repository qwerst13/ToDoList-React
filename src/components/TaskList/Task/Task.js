import React from 'react';

import './Task.css';

export default class Task extends React.Component {
    state = {value: this.props.description};

    editTask = (e) => {
        this.setState({value: e.target.value})
    };

    render () {
        const {className, id, description, date, onDelete, onComplete, onEdit, finishEditing} = this.props;
        const isChecked = (className==='completed');

        return (
            <li className={className}>
                <div>
                    <div className="view">
                        <input onChange={ onComplete } className="toggle" type="checkbox" checked={ isChecked } />
                        <label>
                            <span className="description">{ description }</span>
                            <span className="created">{ date.toLocaleTimeString() }</span>
                        </label>
                        <button onClick={ onEdit } className="icon icon-edit"/>
                        <button onClick={ onDelete } className="icon icon-destroy"/>
                    </div>
                    <input
                        onChange={ this.editTask }
                        onKeyDown={ (e) => finishEditing(e, this.state.value, id) }
                        type="text"
                        className="edit"
                        value={ this.state.value }
                    />
                </div>
            </li>

        );
    }
}