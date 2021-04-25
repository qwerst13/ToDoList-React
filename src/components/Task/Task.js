import React from 'react';

import './Task.css';


export default class Task extends React.Component {
    render () {
        const {description, date} = this.props;

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
    }
}