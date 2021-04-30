import React from 'react';

import './TaskFilter.css';

export default class TaskFilter extends React.Component {

    render() {
        const { filterTasks, selected } = this.props;
        const buttonTypes = ['All', 'Active', 'Completed'];

        const buttons = buttonTypes.map((item) => {
            let className = '';
            if (item === selected) className = 'selected';

            return (
                <li key={item}>
                    <button className={className}>{item}</button>
                </li>
            )
        });

        return (
            <ul onClick={filterTasks} className="filters">
                {buttons}
            </ul>
        );
    }
};