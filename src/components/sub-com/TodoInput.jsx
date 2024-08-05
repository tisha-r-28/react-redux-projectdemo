import React, { useState } from 'react'

function TodoInput(props) {
    const { formData, setFormData, todos, setTodos } = props;

    const [error, setError] = useState({})

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
            let errors = {}
            if (formData.title === '') {
                errors.errorTitle = 'Title is required!'
            }
            if (formData.description === '') {
                errors.errorDescription = 'Description is required!'
            }

            if (Object.keys(errors).length > 0) {
                setError(errors);
                return;
            }

            todos.push(formData);
            setTodos(todos);

            localStorage.setItem('todos', JSON.stringify(todos));

            setFormData({
                title: '',
                description: ''
            })

        } catch (error) {
            console.log(error.message, 'isit');
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
                                {error.errorTitle && <p className="text-danger">{error.errorTitle}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" aria-describedby="emailHelp" name='description' value={formData?.description} onChange={(e) => handleChange(e)} />
                                {error.description && <p className="text-danger">{error.description}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoInput
