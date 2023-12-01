import React, { useState, useEffect } from 'react';
import PostCard from '../post-card/PostCard';

import * as postService from '../../services/postService';
import './Main.css';

export default function Main() {

    const [showLatest, setShowLatest] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAndSetPosts = async () => {
            try {
                // Assuming postService.getAll() fetches posts
                const postsObject = await postService.getAll();

                // Check if the received data is an object
                if (typeof postsObject === 'object' && postsObject !== null) {
                    // Convert object keys into an array of posts
                    const postsArray = Object.keys(postsObject).map((key) => ({
                        _id: key, // Assuming the post ID is stored in the key
                        ...postsObject[key], // Spread other post properties
                    }));

                    // Sort posts by createdAt in descending order to get the latest first
                    const sortedPosts = postsArray.sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));

                    // Take only the first three posts (the latest)
                    const latestPosts = sortedPosts.slice(0, 3);

                    setPosts(latestPosts);
                } else {
                    console.error('Received data is not in an object format:', postsObject);
                    // You can handle this situation accordingly (e.g., set an empty array or show an error message)
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAndSetPosts().then(() => {
            const timer = setTimeout(() => {
                setShowLatest(true);
            }, 1000);

            return () => clearTimeout(timer); // Clear the timeout
        });
    }, []);

    return (
        <section className={`element ${showLatest ? 'show' : ''}`}>
            <h1 className="latest">Latest Posts</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {showLatest &&
                    posts.map((post) => (
                        <PostCard
                            key={post._id} {...post}
                        // imageUrl={post.imageUrl}
                        // title={post.title}
                        // content={post.content}
                        // _ownerId={post._ownerId}
                        // _id={post._id}
                        // description={post.description}
                        />
                    ))}
            </div>
        </section>
    );
}
