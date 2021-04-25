import React from 'react';

import './Task.css';

const Task = ({className, description, date}) => {
    return (
        <div>
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className="description">{ description }</span>
                    <span className="created">{ date.toLocaleTimeString() }</span>
                </label>
                <button className="icon icon-edit"/>
                <button className="icon icon-destroy"/>
            </div>
            <input type="text" className="edit" value="Editing task"/>
        </div>
    );
};

export default Task;