import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as postService from '../../services/postService';
import './Add.css';

const addFormKeys = {
    ImageUrl: 'imageUrl',
    Title: 'title',
    Content: 'content',
};

export default function Add() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        [addFormKeys.ImageUrl]: '',
        [addFormKeys.Title]: '',
        [addFormKeys.Content]: '',
        Author: user ? user.username : '', // Include the author's username
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const { imageUrl, title, content } = formData;

        if (!imageUrl.trim()) {
            alert('Please provide an Image URL.');
            return;
        }

        if (title.trim().length < 5 || title.trim().length > 50) {
            alert('Your title should be between 5 and 50 characters.');
            return;
        }

        if (!content.trim()) {
            alert('Please enter the post content.');
            return;
        } else if (content.trim().length > 300) {
            alert('Post content cannot be more than 300 characters.')
        }

        try {
            const post = await postService.create(formData);
            navigate('/posts');
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="add-container">
            <form className="post-form" onSubmit={submitHandler}>
                <h2>Add New Post</h2>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the image URL here"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData[addFormKeys.ImageUrl]}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="post-title">Title:</label>
                    <input
                        type="text"
                        id="post-title"
                        name="title"
                        value={formData[addFormKeys.Title]}
                        placeholder="Enter the post title"
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="post-content">Content:</label>
                    <textarea
                        id="post-content"
                        name="content"
                        value={formData[addFormKeys.Content]}
                        placeholder="Enter the post content"
                        onChange={inputChangeHandler}
                    />
                </div>
                <button className="post-button" type="submit">
                    SUBMIT
                </button>
            </form>
        </div>
    );
}
