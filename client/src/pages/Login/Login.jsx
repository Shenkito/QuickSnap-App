// import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
// import * as userService from '../../services/userService';

import { Link } from 'react-router-dom';

import './Login.css'

//Upgrade
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

        const { email, password } = values;

        // Check if email or password fields are empty
        if (!email || !password) {
            alert('Please fill in both email and password fields.');
            return;
        }

        try {
            const user = await login({
                email: values[LoginFormKeys.Email],
                password: values[LoginFormKeys.Password],
            });

            // Serialize and store the user data after successful login
            // localStorage.setItem('user', userService.serializeUser(user));

            navigate('/');
        } catch (error) {
            alert(error)
        }
    };

    //With useForm
    // const loginSubmitHandler = async (data) => {
    //     try{
    //         const user = await login(data);
    //         console.log(user);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // const { values, onChange, onSubmit } = useForm(loginSubmitHandler,{ // Custom Hook -> controlled form (see bellow inputs)
    //     //When mount those are the initial values
    //     [LoginFormKeys.Email]: '',
    //     [LoginFormKeys.Password]: '',
    // });

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
                <p>
                    If you are not registered, <Link to="/register" className="register-link">click here</Link> to register.</p>
            </form>
        </div>
    );
}