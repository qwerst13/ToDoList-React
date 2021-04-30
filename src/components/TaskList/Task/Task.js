import React from 'react';

import './Task.css';

export default class Task extends React.Component {
    state = {value: this.props.description};

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
        const {className, description, date, onDelete, onComplete, onEdit} = this.props;
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