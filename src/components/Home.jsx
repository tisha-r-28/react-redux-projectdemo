import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    useEffect(() => {
        localStorage.clear();
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 my-3">
                        <h1 className='text-center'>Welcome</h1>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <div className='me-3'>
                            <Link to='/login'>
                                <button className='btn btn-primary'>Login</button>
                            </Link>
                        </div>
                        <div>
                            <Link to='/signup'>
                                <button className='btn btn-primary'>Sign-up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Home;
