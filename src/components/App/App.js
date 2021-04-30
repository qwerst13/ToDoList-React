import React from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './App.css';

export default class App extends React.Component {
    state = {
        data: [
            {id: 0, className: '', description: 'Completed task', date: new Date()},
            {id: 1, className: '', description: 'Psst', date: new Date()},
            {id: 2, className: '', description: 'Active', date: new Date()},
            {id: 3, className: '', description: 'One more todo item', date: new Date()}
        ],
        activeFilter: 'All'
    };

    deleteTask = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex((item) => item.id === id);
            const newData = data.slice();

            newData.splice(index, 1);

            return {data: newData}
        });
    };

    clearCompleted = () => {
        this.state.data.forEach(({id, className}) => {
            if (className === 'completed') this.deleteTask(id);
        })
    };

    filterTasks = (e) => {
        if (e.target.tagName==='BUTTON') {
            this.setState({activeFilter: e.target.textContent})
        }
    };

    createTask = (value) => {
        const newTask = {id: Date.now(), className: '', description: value, date: new Date()};
        this.setState(({data})=>{
            return {data: [...data, newTask]}
        });
    };

    completeTask = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex((item) => item.id === id);
            const {className: currentClass} = data[index];

            const newClass = (currentClass === '') ? 'completed' : '';

            const newItem = {...data[index], className: newClass};

            return {data: [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index+1)
            ]}
        })
    };

    editTask = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex((item) => item.id === id);
            const newItem = {...data[index], className: 'editing'};
            return {data: [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index+1)
            ]}
        })
    };

    finishEditing = (e, value, id) => {
        //confirm changes - Enter
        if (e.keyCode===13){
            this.setState(({data}) => {
                const index = this.state.data.findIndex((item) => item.id === id);
                const newItem = {...data[index], description: value, className: ''};
                return {data: [
                    ...data.slice(0, index),
                    newItem,
                    ...data.slice(index+1)
                ]}
            });
        }

        //cancel changes - Esc
        if (e.keyCode===27){
            this.setState(({data}) => {
                const index = this.state.data.findIndex((item) => item.id === id);
                const newItem = {...data[index], className: ''};
                return {data: [
                    ...data.slice(0, index),
                    newItem,
                    ...data.slice(index+1)
                ]}
            });
        }
    };

    render(){
        const {data, activeFilter} = this.state;

        const toDoCount = data.filter((item) => (item.className !== 'completed')).length;

        const dataAfterFilter = data.filter((item) => {
            if (activeFilter === 'All') {
                return true;
            }
            if (activeFilter === 'Active') {
                if (item.className === '') return true;
            }
            if (activeFilter === 'Completed') {
                if (item.className === 'completed') return true;
            }

        });

        return (
            <div>
                <section className="todoapp">
                    <NewTaskForm
                        createTask={ this.createTask }
                    />
                    <section className="main">
                        <TaskList
                            dataList={ dataAfterFilter }
                            onDelete={ this.deleteTask }
                            onComplete={ this.completeTask }
                            onEdit={ this.editTask }
                            finishEditing={ this.finishEditing }
                        />
                    </section>
                </section>
                <Footer
                    toDoCount={ toDoCount }
                    filterTasks={ this.filterTasks }
                    clearCompleted={ this.clearCompleted }
                    selected={ activeFilter }
                />
            </div>
        );
    }
}