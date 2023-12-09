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
                const postsObject = await postService.getAll();

                if (typeof postsObject === 'object' && postsObject !== null) {
                    const postsArray = Object.keys(postsObject).map((key) => ({
                        _id: key,
                        ...postsObject[key],
                    }));

                    const sortedPosts = postsArray.sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));

                    const latestPosts = sortedPosts.slice(0, 3);

                    setPosts(latestPosts);
                } else {
                    console.error('Received data is not in an object format:', postsObject);
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAndSetPosts().then(() => {
            const timer = setTimeout(() => {
                setShowLatest(true);
            });

            return () => clearTimeout(timer);
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
