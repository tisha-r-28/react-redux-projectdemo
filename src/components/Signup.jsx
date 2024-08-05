import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const handleSignup = (e) => {
        try {
            e.preventDefault();
            let errors = {};

            if (formData.name === '') {
                errors.name = 'Name is required!';
            }

            if (formData.email === '') {
                errors.email = 'Email is required!';
            } else if (localStorage.getItem('email') === formData.email) {
                errors.email = 'Email already exists!';
            }

            if (formData.password === '') {
                errors.password = 'Password is required!';
            }

            if (formData.confirmPassword === '') {
                errors.confirmPassword = 'Confirm the Password!';
            }

            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match!';
            }

            if (Object.keys(errors).length > 0) {
                setError(errors);
                return;
            }
            localStorage.setItem('email', formData.email);
            localStorage.setItem('password', formData.password);
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <h1 className='mt-3'>Sign-up</h1>
                        <form className='mt-4' onSubmit={(e) => handleSignup(e)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={formData?.name} onChange={(e) => handleChange(e)} />
                                {error && <p className='text-danger'>{error.name}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={formData?.email} onChange={(e) => handleChange(e)} />
                                {error && <p className='text-danger'>{error.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name='password' value={formData?.password} onChange={(e) => handleChange(e)} />
                                {error && <p className='text-danger'>{error.password}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' value={formData?.confirmPassword} onChange={(e) => handleChange(e)} />
                                {error && <p className='text-danger'>{error.confirmPassword}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
