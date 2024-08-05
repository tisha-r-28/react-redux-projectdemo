import React, { useState } from 'react';
import TodoInput from './sub-com/TodoInput';
import TodoList from './sub-com/TodoList';

function Todo() {
    const [formData, setFormData] = useState({})
    const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);

    return (
        <>
            <TodoInput formData={formData} setFormData={setFormData} todos={todos} setTodos={setTodos}/>
            <TodoList todos={todos} setTodos={setTodos}/>
        </>
    )
}

export default Todo;
