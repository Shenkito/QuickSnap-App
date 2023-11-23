// import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

import { login } from '../../services/userService';

import './Login.css'

//Upgrade
const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
}

export default function Login() {

    const [values, setValues] = useState({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    });

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const user = await login(values);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    } 
    
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
                    <label htmlFor="username">Email:</label>
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