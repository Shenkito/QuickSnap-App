import { useForm } from '../../hooks/useForm';

import './Login.css'

export default function Login() {
    
    
    const { values, onChange, onSubmit } = useForm({ // Custom Hook -> controlled form (see bellow inputs)
        //When mount those are the initial values
        email: '',
        password: '',
    });

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={onChange}
                        value={values.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={onChange}
                        value={values.password}
                    />
                </div>
                <button className="login-button" type="submit" onSubmit={onSubmit}>LOGIN</button>
                <p>If you are not registered,  <a href="/register" className="register-link">click here</a> to register. </p>
            </form>
        </div>
    );
}