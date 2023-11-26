import { Link } from "react-router-dom";

import './NavBar.css'

export default function NavBar() {
    return (
        <ul className="nav nav-underline">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/posts">All Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/posts/add">Add Post</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
            </li>
        </ul>
    );
}