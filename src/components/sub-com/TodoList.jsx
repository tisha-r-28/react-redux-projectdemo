import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList(props) {

    const { setTodos, isChecked, setChecked, sort } = props;
    let { todos } = props;

    const all = JSON.parse(localStorage.getItem('todos'));
    const complete = JSON.parse(localStorage.getItem('completedTodos'));
    const notComplete = JSON.parse(localStorage.getItem('notCompleteTodos'));

    todos = sort === 'all' ? todos = all : sort === 'completed' ? todos = complete : sort === 'notCompleted' ? todos = notComplete : sort === '' ? todos : todos
    
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, [setTodos]);

    const navigate = useNavigate();

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    }

    const handleDelete = (id) => {
        try {
            const updatedTodos = todos.filter((_, index) => index !== id);

            setTodos(updatedTodos);

            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCheck = (id) => {
        setChecked(prevChecked => {
            
            const newChecked = prevChecked === 'on' ? 'off' : 'on';
    
            setTodos(prevTodos => {
                const updatedTodos = prevTodos.map((todo, index) => {
                    if (index === id) {
                        return { ...todo, complete: !todo.complete };
                    }
                    return todo;
                });

                localStorage.setItem('todos', JSON.stringify(updatedTodos));
    
                return updatedTodos; 
            });
    
            return newChecked; 
        });
    };

    return (
        <>
            <section className="container mt-5">
                <div className="row">
                    {todos?.map((todo, index) => {
                        return (
                            <div className="col-4" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{todo.title}</h5>
                                        <p className="card-text">{todo.description}</p>
                                        <div className="form-check my-3">
                                            <input className="form-check-input" type="checkbox" id="checkBox" name='complete' value={isChecked} checked={todo.complete !== undefined ? todo.complete : false} onChange={(e) => handleCheck(index)}/>
                                            <label className="form-check-label" htmlFor="checkBox">
                                                Completed
                                            </label>
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdate(index)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-primary mx-4"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default TodoList
