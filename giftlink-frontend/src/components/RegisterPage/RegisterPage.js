import React, { useState } from 'react'

import './RegisterPage.css';

export const RegisterPage = () => {


    //firstName, lastName, email, password
    const [fistName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                        <form onSubmit={handleRegister}>

                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="form-control mb-3"
                                value={fistName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="form-control mb-3"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="submit" className="btn btn-primary btn-block mt-3">
                                Register
                            </button>
                        </form>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )
}
