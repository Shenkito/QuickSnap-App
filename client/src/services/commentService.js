const baseUrl = 'http://localhost:3030/data'

import { getStoredUser } from './userService';

export const getAll = async () => {
    try {
        const response = await fetch(`${baseUrl}/comments`);

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const comments = await response.json();
        return comments;

    } catch (error) {
        alert(error)
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
        return comments;

    } catch (error) {
        alert(error)
    }
};

export const deleteComment = async (commentId) => {
    const storedUser = getStoredUser();

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    try {
        const response = await fetch(`${baseUrl}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Error deleting comment: ' + error.message);
    }
};

export const updateComment = async (commentId, updatedCommentData) => {
    const storedUser = getStoredUser();

    if (!storedUser || !storedUser.accessToken) {
        throw new Error('Access token not found');
    }

    const { accessToken } = storedUser;

    try {
        const response = await fetch(`${baseUrl}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken,
            },
            body: JSON.stringify(updatedCommentData),
        });

        if (!response.ok) {
            throw new Error('Failed to update comment');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Error updating comment: ' + error.message);
    }
};