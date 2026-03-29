import React, { useState } from 'react'

import './RegisterPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const RegisterPage = () => {

    const url = urlConfig.backendUrl;

    //firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //error handling
    const [showerr, setShowerr] = useState('');


    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();



    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                if (data.authtoken) {
                    sessionStorage.setItem('auth-token', data.authtoken);
                    sessionStorage.setItem('name', data.firstName);
                    sessionStorage.setItem('email', data.email);
                    //Step 2 - Task 3
                    setIsLoggedIn(true);
                    //Step 2 - Task 4
                    navigate('/app');
                }
                if (data.error) {
                    //Step 2 - Task 5
                    setShowerr(data.error);
                }
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again later.');
        }
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
                                value={firstName}
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
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {/* Step 2 - Task 6*/}

                                <div className="text-danger">{showerr}</div>
                            </div>
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
