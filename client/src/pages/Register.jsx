import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button className="login-button" type="submit">Register</button>
                </form>
                <p className="login-link">
                    If you already have profile, <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}