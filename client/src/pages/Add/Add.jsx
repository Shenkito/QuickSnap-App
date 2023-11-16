import './Add.css'

export default function Add() {
    return (
        <div className="add-container">
            <form className="post-form">
                <h2>Add New Post</h2>
                <div className="form-group">
                    <label htmlFor="post-title">Title:</label>
                    <input
                        type="text"
                        id="post-title"
                        name="title"
                        placeholder="Enter the post title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="post-content">Content:</label>
                    <textarea
                        id="post-content"
                        name="content"
                        placeholder="Enter the post content"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="post-author">Author:</label>
                    <input
                        type="text"
                        id="post-author"
                        name="author"
                        placeholder="Enter your name"
                    />
                </div>
                <button className="post-button" type="submit">SUBMIT</button>
            </form>
        </div>
    );
}