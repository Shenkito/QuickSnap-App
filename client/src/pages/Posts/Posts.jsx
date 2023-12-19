import { useEffect, useState } from 'react';

import * as postService from '../../services/postService';

import PostCard from '../../components/post-card/PostCard';

import './Posts.css'

export default function Posts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsObject = await postService.getAll();

                if (typeof postsObject === 'object' && postsObject !== null) {
                    const postsArray = Object.keys(postsObject).map((key) => ({
                        _id: key,
                        ...postsObject[key],
                    }));
                    setPosts(postsArray);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                alert(error)
            }
        };

        fetchPosts();
    }, []);

    const updateDeletePostHandler = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    };
    
    const updateEditPostHandler = (updatedPost) => {
        setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(post => {
                if (post._id === updatedPost._id) {
                    return updatedPost;
                }
                return post;
            });
            return updatedPosts;
        });
    };
    return (
        <div className="posts-wrapper">
            <div className="post-cards">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post._id} {...post} updateEditPostHandler={updateEditPostHandler} updateDeletePostHandler={updateDeletePostHandler}
                        // key={post._id} // Assuming post._id is the unique identifier
                        // imageUrl={post.imageUrl}
                        // title={post.title}
                        // content={post.content}
                        // author={post._ownerId}
                        />
                    ))
                ) : (
                    <p className='no-posts-message'>No posts available.</p>
                )}
            </div>
        </div>
    );
}