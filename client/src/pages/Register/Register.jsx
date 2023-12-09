import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Link } from 'react-router-dom';

import './Register.css';

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirmPassword',
    Bio: 'bio', // Add the key for bio field
    ProfileImage: 'profileImage', // Add the key for profile image field
    Username: 'username', // Add the key for the username field
};

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [values, setValues] = useState({
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
        [RegisterFormKeys.Bio]: '', // Initialize bio field
        [RegisterFormKeys.ProfileImage]: '', // Initialize profile image field
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

        const { email, password, confirmPassword, bio, profileImage, username } = values;

        // Check for empty fields
        if (!email || !password || !confirmPassword || !bio || !profileImage || !username) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation using a simple regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (username.length < 5 || username.length > 20) {
            alert('Username should be between 5 and 20 characters');
            return;
        }

        // Password length validation
        if (password.length < 6) {
            alert('Password should be at least 6 characters long.');
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (bio.length < 10 || bio.length > 200) {
            alert('Bio must be between 30 and 200 characters.');
            return;
        }

        try {
            const user = await register({
                email: values[RegisterFormKeys.Email],
                password: values[RegisterFormKeys.Password],
                username: values[RegisterFormKeys.Username],
                bio: values[RegisterFormKeys.Bio], // Pass the bio value to the register function
                profileImage: values[RegisterFormKeys.ProfileImage], // Pass the profile image URL to the register function
            });

            // Redirect to the home page after successful registration
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
                    If you already have an account, <Link to="/login" className="login-link">click here</Link> to log in.</p>
            </form>
        </div>
    );
}
