import { useState } from 'react';
import './Add.css'

const addFormKeys = {
    Title: 'title',
    Content: 'content',
    Author: 'author'
}

export default function Add() {

    const [formData, setFormData] = useState({
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

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="add-container">
            <form className="post-form" onSubmit={submitHandler}>
                <h2>Add New Post</h2>
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