import { useState, useEffect } from 'react';

import Post from '../Posts/Post';

import './Main.css'

export default function Main() {

    const [showLatest, setShowLatest] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLatest(true);
        }, 1000);

        return () => clearTimeout;
    }, []);

    return (
        <div className="element">
            <h1 className={showLatest ? 'latest show' : 'latest'}>Latest Posts</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <Post />
                {/* Add more cards in similar structure */}
            </div>
        </div>
    );
}