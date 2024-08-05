import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const Eemail = localStorage.getItem('email');

    if (Eemail) {
        formData.email = Eemail;
    }

    const token = `${formData.email}erdty#$%^&ghbjn`;

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        try {
            const name = e.target.name;
            const value = e.target.value;
            setFormData({
                ...formData,
                [name]: value
            })
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const handleLogin = (e) => {
        try {
            e.preventDefault();

            let errors = {};

            if (formData.email === '') {
                errors.email = 'Email is required!';
            }
            if (formData.password === '') {
                errors.password = 'Password is required!';
            }

            if (Object.keys(errors).length > 0) {
                setError(errors);
                return;
            }

            const newEmail = localStorage.getItem('email');
            const newPassword = localStorage.getItem('password');
            if (newEmail !== formData.email) {
                setError({
                    email: 'Enter valid email!'
                })
            }
            if (formData.password !== newPassword) {
                setError({
                    password: 'Enter valid password'
                })
            }
            setFormData({
                email: '',
                password: ''
            })
            if (formData.password === newPassword && formData.email === newEmail) {
                navigate('/to-do');
                localStorage.setItem('token', JSON.stringify(token));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <h1 className='mt-3'>Login</h1>
                        <form className='mt-4' onSubmit={(e) => handleLogin(e)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => handleChange(e)} value={formData?.email} name='email' />
                                {error && <p className="text-danger">{error.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleChange(e)} value={formData?.password} name='password' />
                                {error && <p className="text-danger">{error.password}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
