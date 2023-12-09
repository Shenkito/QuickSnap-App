import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import './Register.css';

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirmPassword',
    Bio: 'bio',
    ProfileImage: 'profileImage',
    Username: 'username',
};

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [values, setValues] = useState({
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
        [RegisterFormKeys.Bio]: '',
        [RegisterFormKeys.ProfileImage]: '',
        [RegisterFormKeys.Username]: '',
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
            const user = await register({
                email: values[RegisterFormKeys.Email],
                password: values[RegisterFormKeys.Password],
                username: values[RegisterFormKeys.Username],
                bio: values[RegisterFormKeys.Bio],
                profileImage: values[RegisterFormKeys.ProfileImage],
            });

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
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name={RegisterFormKeys.Username}
                        placeholder="Enter your username"
                        onChange={inputChangeHandler}
                        value={values[RegisterFormKeys.Username]}
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
                <div className="register-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name={RegisterFormKeys.Bio}
                        placeholder="Enter your bio"
                        onChange={inputChangeHandler}
                        value={values[RegisterFormKeys.Bio]}
                    />
                </div>
                <div className="register-group">
                    <label htmlFor="profileImage">Profile Image URL:</label>
                    <input
                        type="text"
                        id="profileImage"
                        name={RegisterFormKeys.ProfileImage}
                        placeholder="Enter profile image URL"
                        onChange={inputChangeHandler}
                        value={values[RegisterFormKeys.ProfileImage]}
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
