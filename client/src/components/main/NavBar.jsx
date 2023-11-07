import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navbar"> {/* Apply the 'navbar' class */}
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/add">Add Post</Link></li>
                {/* Add more navigation links as needed */}
            </ul>
        </nav>
    );
}