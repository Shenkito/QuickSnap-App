import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './PostCard.css';

export default function PostCard({ imageUrl, title, content, Author, _ownerId, description }) {
    const { user } = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const likeClickHandler = () => {
        setLiked(!liked);
        // Logic for handling like button click
        // Add the logic here to handle liking posts
    };

    const commentSubmitHandler = (e) => {
        e.preventDefault();
        // Logic for handling comment submission
        // Add the logic here to handle adding comments
    };

    return (
        <div className="col">
            <div className={`card ${expanded ? 'expanded' : ''}`}>
                <img src={imageUrl} className="card-img-top" alt="Post" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{expanded ? content : description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary">Author: {Author}</small>
                </div>
                <button className="btn-details" onClick={user ? toggleExpand : null}>
                    {expanded ? 'See Less' : 'See Details'}
                </button>

                {expanded && (
                    <div className="details-section">
                        <div className="comments-section">
                            <form className="comment-form" onSubmit={commentSubmitHandler}>
                                <div className="form-group">
                                    <label htmlFor="comment">Comment:</label>
                                    <textarea
                                        className="comment-input"
                                        id="comment"
                                        name="comment"
                                        rows="3"
                                        placeholder="Write your comment here..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="comment-button">
                                    Add Comment
                                </button>
                            </form>
                            {comments.length > 0 ? (
                                <ul className="comment-list">
                                    {comments.map((comment, index) => (
                                        <li key={index} className="comment">
                                            {comment}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                        <div className="interaction-section">
                            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={likeClickHandler}>
                                {liked ? 'Liked' : 'Like'}
                            </button>
                        </div>
                        <span className="like-count">'Display likes here'</span>
                    </div>
                )}
            </div>
        </div>
    );
}
