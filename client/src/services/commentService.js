const baseUrl = 'http://localhost:3030/data'

import { getStoredUser } from './userService';

export const getAll = async () => {
    try {
        const response = await fetch(`${baseUrl}/comments`);

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const comments = await response.json();
        console.log(comments);
        return comments;

    } catch (error) {
        console.log('Error fetching comments:', error);
    }
};

export const create = async (commentData) => {
    const storedUser = getStoredUser();

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    const response = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken,
            
        },
        body: JSON.stringify(commentData),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    const result = await response.json();
    return result;

};

export const getByPostId = async (postId) => {
    try {
        const response = await fetch(`${baseUrl}/comments?where=PostId%3D%22${postId}%22`);

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const comments = await response.json();
        console.log(comments);
        return comments;

    } catch (error) {
        console.log('Error fetching comments:', error);
    }
};