import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Quick Snap. Created by Ivelin Shenkov-Shenkito. Project for SoftUni ReactJS course.</p>
        </footer>
    );
}