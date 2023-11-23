import { useState } from "react";

import './Register.css'

export default function Register() {


    return (
        <div className="register-container">
            <form className="register-form">
                <h2>Register</h2>
                <div className="register-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="register-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="register-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
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