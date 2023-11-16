import { useState, useEffect } from 'react';

import './Hero.css';


export default function Hero() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Welcome to Quick Snap</h1>
                <p>Discover the easiest way to capture and share moments.</p>
                <a href="/register" className="cta-button">Sign Up</a>
            </div>
        </div>
    );
}