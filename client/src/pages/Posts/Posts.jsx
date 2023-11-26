import { useEffect, useState } from 'react';

import * as postService from '../../services/postService';

import PostCard from '../../components/main-post-card/PostCard';

import './Posts.css'

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsObject = await postService.getAll();

                // Check if the received data is an object
                if (typeof postsObject === 'object' && postsObject !== null) {
                    // Convert object keys into an array of posts
                    const postsArray = Object.keys(postsObject).map((key) => ({
                        _id: key, // Assuming the post ID is stored in the key
                        ...postsObject[key], // Spread other post properties
                    }));
                    setPosts(postsArray);
                } else {
                    console.error('Received data is not in an object format:', postsObject);
                    // You can handle this situation accordingly (e.g., set an empty array or show an error message)
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="posts-wrapper">
            <div className="post-cards">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard
                            key={post._id} // Assuming post._id is the unique identifier
                            imageUrl={post.imageUrl}
                            title={post.title}
                            content={post.content}
                            author={post.author}
                        />
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
            {/* Pagination component */}
            {/* Add pagination component here */}
        </div>
    );
}