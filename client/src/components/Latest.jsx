import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as postService from "../services/postService";

export default function LatestPosts() {

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        postService.getAll()
            .then(result => setPosts(result));
        //maybe .catch in case of using it for some better UI experience
    }, [])

    return (
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
    );
}