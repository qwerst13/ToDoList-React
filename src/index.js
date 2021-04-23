import React from 'react';
import ReactDOM from 'react-dom';

import Title from './components/Title';
import Search from './components/Search';
import TodoList from './components/TodoList';
import Clock from './components/Clock'

const App = () => {

    const data =  [
        {label: 'First step', id: '1'},
        {label: 'Second something', id: '2'},
        {label: 'Third wohoo!', id: '3'}
    ];

    return (
        <div>
            <Title />
            <Clock />
            <Search />
            <TodoList data = { data } />

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

