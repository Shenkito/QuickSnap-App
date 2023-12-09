import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate('/');
    };

    return (
        <ul className="nav nav-underline">
            {user ? (
                <li className="nav-item user-info">Logged as {user.username}</li>
            ) : null}
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/posts">All Posts</Link>
            </li>

            {user ? (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/posts/add">Add Post</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item" onClick={logoutHandler}>
                        <Link className="nav-link" to="#">
                            Logout
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </>
            )}
        </ul>
    );
}