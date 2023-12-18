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