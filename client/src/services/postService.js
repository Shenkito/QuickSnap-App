const baseUrl = 'http://localhost:3030/data'

import { getStoredUser } from './userService';

export const getAll = async () => {
    try {
        const response = await fetch(`${baseUrl}/posts`);

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const posts = await response.json();
        console.log(posts);
        return posts;

    } catch (error) {
        console.log('Error fetching posts:', error);
    }
};

export const getOne = async (postId) => {
    try {
        const response = await fetch(`${baseUrl}/posts/${postId}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const post = await response.json();
        return post;
    } catch (error) {
        console.log('Error fetching post:', error);
        throw error;
    }
};

export const create = async (postData) => {
    const storedUser = getStoredUser(); // Retrieve user data containing the access token

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    const response = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken, // Include the access token in the header

        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    const result = await response.json();
    return result;

};

export const update = async (postData, postId) => {
    const storedUser = getStoredUser(); // Retrieve user data containing the access token

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken, // Include the access token in the header

        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    const result = await response.json();
    return result;

};

export const remove = async (postId) => {
    const storedUser = getStoredUser(); // Retrieve user data containing the access token

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken, // Include the access token in the header

        },
        body: JSON.stringify(),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    const result = await response.json();
    return result;

};