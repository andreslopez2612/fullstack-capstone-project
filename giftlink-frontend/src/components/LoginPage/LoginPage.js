import React, { useEffect, useState } from 'react'
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [incorrect, setIncorrect] = useState('');
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app')
        }
    }, [navigate])

    const handleLogin = async () => {
        try {
            //first task
            const response = await fetch(`/api/auth/login`, {
                //{{Insert code here}} //Task 7: Set method
                method: 'POST',
                //{{Insert code here}} //Task 8: Set headers
                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
                },
                //{{Insert code here}} //Task 9: Set body to send user details
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            // Task 1: Access data coming from fetch API
            const data = await response.json();
            // Task 2: Set user details
            sessionStorage.setItem('auth-token', data.authtoken);
            sessionStorage.setItem('name', data.userName);
            sessionStorage.setItem('email', data.userEmail);
            // Task 3: Set the user's state to log in using the `useAppContext`.
            setIsLoggedIn(true);
            // Task 4: Navigate to the MainPage after logging in.
            navigate('/app');
            // Task 5: Clear input and set an error message if the password is incorrect
            if (data.authtoken) {
                // Tasks 1-4 done previously
            } else {
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                setIncorrect("Wrong password. Try again.");
                //Below is optional, but recommended - Clear out error message after 2 seconds
                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
            }
            // Task 6: Display an error message to the user.
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        {/* insert code here to create input elements for the variables email and  password */}

                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>{incorrect}</span>
                        <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Login</button>


                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
