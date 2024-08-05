import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Updatetodo() {

    const navigate = useNavigate()

    const { id } = useParams();
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    const todo = todos.at(id);

    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description
    })

    const [error, setError] = useState({
        title: '',
        description: ''
    })

    const handleChange = (e) => {
        try {
            const name = e.target.name;
            const value = e.target.value;
            setFormData({
                ...formData,
                [name]: value
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleTodos = (e) => {
        try {
            e.preventDefault();
            let errors = {};

            if (formData.title === '') {
                errors.title = 'Title is required';
            }

            if (formData.description === '') {
                errors.description = 'Description is required!';
            }

            if (Object.keys(errors).length > 0) {
                setError(errors);
                return;
            }

            todos[id] = formData

            localStorage.setItem('todos', JSON.stringify(todos));
            setFormData({
                title: '',
                description: ''
            })
            navigate('/to-do');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <h1 className='mt-3'>Add To-Do</h1>
                        <form className='mt-4' onSubmit={(e) => handleTodos(e)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' value={formData?.title} onChange={(e) => handleChange(e)} />
                                {error && <p className="text-danger">{error.errorTitle}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" aria-describedby="emailHelp" name='description' value={formData?.description} onChange={(e) => handleChange(e)} />
                                {error && <p className="text-danger">{error.errorTitle}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Updatetodo;
