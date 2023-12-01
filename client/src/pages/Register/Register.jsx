import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userService from '../../services/userService';

import './Register.css'

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirmPassword'
}

export default function Register() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const user = await userService.register({
                email: values[RegisterFormKeys.Email],
                password: values[RegisterFormKeys.Password],
            });

            // Serialize and store the user data after successful login
            localStorage.setItem('user', userService.serializeUser(user));

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={submitHandler}>
                <h2>Register</h2>
                <div className="register-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name={RegisterFormKeys.Email}
                        placeholder="Enter your email"
                        onChange={inputChangeHandler}
                        value={values[RegisterFormKeys.Email]}
                    />
                </div>
                <div className="register-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name={RegisterFormKeys.Password}
                        placeholder="Enter your password"
                        onChange={inputChangeHandler}
                        value={values[RegisterFormKeys.Password]}
                    />
                </div>
                <div className="register-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name={RegisterFormKeys.ConfirmPassword}
                        placeholder="Confirm your password"
                        onChange={inputChangeHandler}
                        value={values[RegisterFormKeys.ConfirmPassword]}
                    />
                </div>
                <button className="register-button" type="submit">
                    REGISTER
                </button>
                <p>
                    If you already have an account,<a href="/login" className="login-link">click here</a>to log in.
                </p>
            </form>
        </div>
    );
}