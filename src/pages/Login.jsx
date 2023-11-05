import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button className="login-button" type="submit">Login</button>
                </form>
                <p className="register-link">
                    If you don't have a profile, <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}