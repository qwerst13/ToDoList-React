import React from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './App.css';

const App = () => {
    const data = [
        {id: 1, className: 'completed', description: 'Completed task', date: new Date()},
        {id: 2, className: 'editing', description: '', date: new Date()},
        {id: 3, className: '', description: 'Active', date: new Date()},
        {id: 4, className: '', description: 'One more todo item', date: new Date()}
    ];
    return (
        <div>

            <section className="todoapp">

                <NewTaskForm />

                <section className="main">
                    <TaskList dataList={data} />
                </section>

            </section>

            <Footer />
        </div>
    );
};

export default App;