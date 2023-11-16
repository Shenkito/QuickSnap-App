import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Quick Snapp. Designed by Shenkito.</p>
        </footer>
    );
}