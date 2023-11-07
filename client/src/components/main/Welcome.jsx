import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="welcome-section">
            <h1>Welcome to QuickSnap. Your Social Media App.</h1>
            <p>Share your thoughts, connect with friends, and discover amazing content!</p>
            <div className="button-container">
                <Link to="/register" className="button">Get Started</Link>
            </div>
        </div>
    );
}