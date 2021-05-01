import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {

    static defaultProps = {
        createTask: () => {}
    };

    static propTypes = {
        createTask:  PropTypes.func
    };

    state = {value: ''};

    changeInputState = (e) => {
        this.setState({value: e.target.value});
    };

    createTask = (e) => {
        if (e.keyCode===13) {
            this.props.createTask(this.state.value);
            this.setState({value: ''});
        }
    };

    render(){
        const {value} = this.state;
        return (
            <header className="header">
                <h1>ToDo List</h1>
                <input
                    onChange={ this.changeInputState }
                    onKeyDown={ this.createTask }
                    value={ value }
                    className="new-todo"
                    placeholder="What needs to be done?"
                />
            </header>
        );
    }
};