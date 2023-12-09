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

    const updateEditPostHandler = (post) => {
        const old = posts.filter(oldPost => oldPost._id !== post._id)
        setPosts([...old, post])
    }

    // const updateDeletePostHandler = (post) => {
    //     setPosts(oldPosts => oldPosts.filter(currPost => currPost._id !== post._id));
    // };

    return (
        <div className="posts-wrapper">
            <div className="post-cards">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post._id} {...post} updateEditPostHandler={updateEditPostHandler} //updateDeletePostHandler={updateDeletePostHandler}
                        // key={post._id} // Assuming post._id is the unique identifier
                        // imageUrl={post.imageUrl}
                        // title={post.title}
                        // content={post.content}
                        // author={post._ownerId}
                        />
                    ))
                ) : (
                    <p className='no-posts-message'>No posts available</p>
                )}
            </div>
        </div>
    );
}