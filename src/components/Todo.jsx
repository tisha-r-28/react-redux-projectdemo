import React, { useState } from 'react';
import TodoInput from './sub-com/TodoInput';
import TodoList from './sub-com/TodoList';

function Todo() {
    const [formData, setFormData] = useState({
        title : '',
        description : ''
    })
    const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
    const [ isChecked, setChecked ] = useState('off');
    const [ sort, setSort ] = useState('');

    return (
        <>
            <TodoInput formData={formData} setFormData={setFormData} todos={todos} setTodos={setTodos} isChecked={isChecked} setSort={setSort} sort={sort}/>
            <TodoList todos={todos} setTodos={setTodos} isChecked={isChecked} setChecked={setChecked} sort={sort} setSort={setSort}/>
        </>
    )
}

export default Todo;