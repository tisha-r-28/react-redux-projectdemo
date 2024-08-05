import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList(props) {

    const { todos, setTodos } = props;

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
