import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import './Login.css'


const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
}

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [values, setValues] = useState({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
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
            const user = await login({
                email: values[LoginFormKeys.Email],
                password: values[LoginFormKeys.Password],
            });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={submitHandler}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name={LoginFormKeys.Email}
                        placeholder="Enter your email"
                        onChange={inputChangeHandler}
                        value={values[LoginFormKeys.Email]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name={LoginFormKeys.Password}
                        placeholder="Enter your password"
                        onChange={inputChangeHandler}
                        value={values[LoginFormKeys.Password]}
                    />
                </div>
                <button className="login-button" type="submit">LOGIN</button>
                <p>If you are not registered,  <a href="/register" className="register-link">click here</a> to register. </p>
            </form>
        </div>
    );
}