import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function HomePage(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => response.json())
            .then((result) => {
                setPosts(result);
            })

    }, [])

    return (
        <div>
            <div className="welcome-section">
                <h1>Welcome to QuickSnap. Your Social Media App.</h1>
                <p>Share your thoughts, connect with friends, and discover amazing content!</p>
                <div className="button-container">
                    <Link to="/register" className="button">Get Started</Link>
                </div>
            </div>

            <div className="container">
                <h2>Latest Posts</h2>
                {posts.map((post) => (
                    <div className="post-card" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <Link to={`/post/${post.id}`} className="post-button">See Post</Link>
                    </div>
                ))}
            </div>
        </div>

    );
}