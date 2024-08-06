import React, { useState } from 'react';

function TodoInput(props) {
    const { formData, setFormData, todos, setTodos, isChecked, setSort, sort } = props;

    const [error, setError] = useState({});

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

            formData.complete = isChecked === 'on';

            todos.push(formData);

            setTodos(todos);

            localStorage.setItem('todos', JSON.stringify(todos));

            setFormData({
                title: '',
                description: ''
            })
            localStorage.setItem('sort', JSON.stringify(sort));

        } catch (error) {
            console.log(error.message, 'isit');
        }
    }

    const handleSort = (e) => {
        const value = e.target.value;
        setSort(value);
        console.log(sort, "start");

        if(sort === 'completed'){
            const completeTodos = todos.filter((todo) => {
                return todo.complete === true;
            })
            localStorage.setItem('completedTodos', JSON.stringify(completeTodos));
        }
        else if(sort === 'notCompleted'){
            const notCompleteTodos = todos.filter((todo) => {
                return todo.complete === false;
            })
            
            localStorage.setItem('notCompleteTodos', JSON.stringify(notCompleteTodos));
        }
        else if(sort === 'all'){
            console.log(sort, "all");
            return todos;
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-5">
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
                    <div className="col-2">
                        <select name="sorting" id="sorting" className='mt-3' onClick={(e) => handleSort(e)}>
                            <option value=''>Sort</option>
                            <option value="completed">Completed</option>
                            <option value="notCompleted">Not Completed</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoInput
