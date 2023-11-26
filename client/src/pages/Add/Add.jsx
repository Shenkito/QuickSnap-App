import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import * as postService from '../../services/postService';

import './Add.css'

const addFormKeys = {
    ImageUrl: 'imageUrl',
    Title: 'title',
    Content: 'content',
    Author: 'author'
}

export default function Add() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        [addFormKeys.ImageUrl]: '',
        [addFormKeys.Title]: '',
        [addFormKeys.Content]: '',
        [addFormKeys.Author]: '',
    });

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const post = await postService.create(formData);
            navigate('/posts');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="add-container">
            <form className="post-form" onSubmit={submitHandler}>
                <h2>Add New Post</h2>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        className="form-control"
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
                <div className="form-group">
                    <label htmlFor="post-author">Author:</label>
                    <input
                        type="text"
                        id="post-author"
                        name="author"
                        value={formData[addFormKeys.Author]}
                        placeholder="Enter your name"
                        onChange={inputChangeHandler}
                    />
                </div>
                <button className="post-button" type="submit">SUBMIT</button>
            </form>
        </div>
    );
}