import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default class TaskFilter extends React.Component {

    static defaultProps = {
        selected: '',
        filterTasks: () => {}
    };

    static propTypes = {
        selected: PropTypes.oneOf(['All', 'Active', 'Completed']),
        filterTasks: PropTypes.func
    };

    render() {
        const { filterTasks, selected } = this.props;
        const buttonTypes = ['All', 'Active', 'Completed'];

        const buttons = buttonTypes.map((item) => {
            let className = '';
            if (item === selected) className = 'selected';

            return (
                <li key={ item }>
                    <button className={ className }>{ item }</button>
                </li>
            )
        });

        return (
            <ul onClick={ filterTasks } className="filters">
                { buttons }
            </ul>
        );
    }
};