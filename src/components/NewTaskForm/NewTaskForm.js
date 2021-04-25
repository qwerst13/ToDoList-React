import React from 'react';

import './NewTaskForm.css';

const NewTaskForm = () => {
    return (
        <header className="header">
            <h1>ToDo List</h1>
            <input className="new-todo" placeholder="What needs to be done?" />
        </header>
    );
};

export default NewTaskForm;