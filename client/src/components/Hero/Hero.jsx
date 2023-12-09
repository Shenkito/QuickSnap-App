import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

import './Hero.css';

export default function Hero() {
    const { user } = useAuth();

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Welcome to Quick Snap.</h1>
                <p>Discover the easiest way to capture and share moments.</p>
                {!user ? (
                    <Link to="/register" className="cta-button">
                        Sign Up
                    </Link>
                ) : (
                    <Link to="/posts" className="cta-button">
                        Browse Posts
                    </Link>
                )}
            </div>
        </section>
    );
}
