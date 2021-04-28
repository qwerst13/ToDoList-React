import React from 'react';

import './Task.css';


export default class Task extends React.Component {

    state = {completed: false};

    completeTask = () => {
        this.setState({completed: !this.state.completed});
        console.log(this.state)
    };

    render () {
        const {className, description, date} = this.props;
        const {completed} = this.state;

        let liClassName = '';

        if (completed) liClassName = 'completed';

        return (
            <li className={liClassName}>
                <div>
                    <div className="view">
                        <input onClick={this.completeTask} className="toggle" type="checkbox"/>
                        <label>
                            <span className="description">{ description }</span>
                            <span className="created">{ date.toLocaleTimeString() }</span>
                        </label>
                        <button className="icon icon-edit"/>
                        <button className="icon icon-destroy"/>
                    </div>
                    <input type="text" className="edit" value="Editing task"/>
                </div>
            </li>
        );
    }
}