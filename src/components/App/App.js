import React from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './App.css';

export default class App extends React.Component {
    state = {
        data: [
            {id: 0, className: '', description: 'Completed task', filtered: false, date: new Date()},
            {id: 1, className: '', description: 'Psst', filtered: false, date: new Date()},
            {id: 2, className: '', description: 'Active', filtered: false, date: new Date()},
            {id: 3, className: '', description: 'One more todo item', filtered: false, date: new Date()}
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
            if (e.target.textContent === 'All') {
                this.setState((state) => {
                    const newData = state.data.map((item)=>{
                        return {...item, filtered: false}
                    });
                    return {
                        activeFilter: e.target.textContent,
                        data: newData
                    };
                })
            }
            if (e.target.textContent === 'Active') {
                this.setState((state) => {
                    const newData = state.data.map((item)=>{
                        return {...item, filtered: (item.className === 'completed')}
                    });
                    return {
                        activeFilter: e.target.textContent,
                        data: newData
                    };
                })
            }
            if (e.target.textContent === 'Completed') {
                this.setState((state) => {
                    const newData = state.data.map((item)=>{
                        return {...item, filtered: (item.className === '')}
                    });
                    return {
                        activeFilter: e.target.textContent,
                        data: newData
                    };
                })
            }
        }
    };

    createTask = (value) => {
        const newTask = {id: Date.now(), className: '', description: value, date: new Date()};
        this.setState(({data})=>{
            return {data: [...data, newTask]}
        });
    };

    completeTask = (id) => {
        this.setState(({data, activeFilter}) => {
            const index = data.findIndex((item) => item.id === id);
            const {className: currentClass} = data[index];

            const newClass = (currentClass === '') ? 'completed' : '';
            const newFilteredState = (activeFilter !== 'All');

            const newItem = {...data[index], className: newClass, filtered: newFilteredState};

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

        return (
            <div>
                <section className="todoapp">
                    <NewTaskForm
                        createTask={ this.createTask }
                    />
                    <section className="main">
                        <TaskList
                            dataList={ data }
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