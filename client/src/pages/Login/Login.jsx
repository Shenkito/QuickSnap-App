import './Login.css'

export default function Login() {
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>
                <button className="login-button" type="submit">LOGIN</button>
                <p>If you are not registered,  <a href="/register" className="register-link">click here</a> to register. </p>
            </form>
        </div>
    );
}