const baseUrl = 'http://localhost:3030/data'

import { getStoredUser } from './userService';

export const like = async (likeData) => {
    const storedUser = getStoredUser();

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    const response = await fetch(`${baseUrl}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,

        },
        body: JSON.stringify(likeData),
    });

    if (!response.ok) {
        throw new Error('Failed to like the post');
    }

    const result = await response.json();
    return result;

};

export const unlike = async (likeId) => {
    const storedUser = getStoredUser();

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    const response = await fetch(`${baseUrl}/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to unlike the post');
    }

    const result = await response.json();
    return result;
};

export const checkUserLikedPost = async (postId, userId) => {
    try {
        const storedUser = getStoredUser();

        if (!storedUser || !storedUser.accessToken) {
            throw new Error('Access token not found');
        }

        const { accessToken } = storedUser;

        const response = await fetch(
            `${baseUrl}/likes?where=PostId%3D%22${postId}%22&where=Author%3D%22${userId}%22`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch user liked post');
        }

        const userLikedPost = await response.json();
        return userLikedPost.length > 0; // Return true if the user has liked the post, false otherwise
    } catch (error) {
        throw new Error('Error checking if the user liked the post');
    }
};

export const getByPostId = async (postId) => {
    try {
        const response = await fetch(`${baseUrl}/likes?where=PostId%3D%22${postId}%22`);

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const likes = await response.json();
        return likes;

    } catch (error) {
        alert(error)
    }
};