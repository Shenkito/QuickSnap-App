import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import * as commentService from '../../services/commentService';
import * as postService from '../../services/postService';
import * as likeService from '../../services/likeService';

import './PostCard.css';

const commentFormKeys = {
    Comment: 'comment',
};

export default function PostCard({ imageUrl, title, content, Author, _ownerId, _id, description, updateEditPostHandler, updateDeletePostHandler }) {
    const { user } = useAuth();
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        [commentFormKeys.Comment]: '',
        Author: user ? user.username : '',
        PostId: _id,
    });
    const [showEditMode, setShowEditMode] = useState(false);
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        imageUrl: '',
    });
    const [likes, setLikes] = useState([]);
    const [newLike, setNewLike] = useState({
        Author: user ? user.username : '',
        PostId: _id,
    });
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (expanded) {

                try {
                    // Fetch comments
                    const fetchedComments = await commentService.getByPostId(_id);
                    setComments(fetchedComments);

                    // Fetch likes
                    const fetchedLikes = await likeService.getByPostId(_id);
                    setLikes(fetchedLikes);
                } catch (error) {
                    alert(error);
                }
            }

        }
        fetchData();
    }, [expanded, _id]); // Or [] if effect doesn't need props or state

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const likeClickHandler = async (e) => {
        e.preventDefault();

        try {
            const currLike = await likeService.like(newLike)
            setLikes([...likes, currLike]);
            setNewLike({ ...newLike });
            setLiked(!liked)
        } catch (error) {
            alert(error)
        }
    };

    const inputChangeHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === 'comment') {
            setNewComment({
                ...newComment,
                [name]: value,
            });
        } else if (type === 'post') {
            setPostData({
                ...postData,
                [name]: value,
            });
        }
    };

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const createdComment = await commentService.create(newComment);
            setComments([...comments, createdComment]);
            setNewComment({ ...newComment, [commentFormKeys.Comment]: '' });
        } catch (error) {
            alert(error)
        }
    };


    const onClickEditHandler = async () => {
        try {
            const post = await postService.getOne(_id)

            setPostData(post);
            setShowEditMode((prevEditMode) => !prevEditMode);
        } catch (error) {
            alert(error)
        }

    }

    const onClickSaveEditHandler = async (e) => {
        e.preventDefault();

        const { imageUrl, title, content } = postData;

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

        const hasConfirmed = confirm(`Do you want to save the changes on ${title} ?`)

        if (hasConfirmed) {

            try {
                const post = await postService.update(postData, _id);
                updateEditPostHandler(post)
                setShowEditMode(false)
            } catch (error) {
                alert(error)
            }
        }
    }

    const onClickDeleteHandler = async (e) => {
        e.preventDefault();

        const hasConfirmed = confirm(`Do you want to delete ${title} ?`);

        if (hasConfirmed) {
            try {
                await postService.remove(_id);
                updateDeletePostHandler(_id); // Assuming _id is the unique identifier for the post
            } catch (error) {
                alert(error);
            }
        }
    };

    const onClickDeleteComment = async (comment) => {
        const hasConfirmed = confirm('Do you want to delete this comment ?');

        if (hasConfirmed) {
            try {
                await commentService.deleteComment(comment._id)
                setComments(prevComments => prevComments.filter(c => c._id !== comment._id));
            } catch (error) {
                alert(error);
            }
        } else {
            alert('Deletion canceled')
        }
    }

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
                <button className="btn-details" onClick={toggleExpand}>
                    {expanded ? 'See Less' : 'See More'}
                </button>
                {user && _ownerId === user._id && (
                    <>

                        <button className="btn-details" onClick={onClickEditHandler}>
                            Edit
                        </button>

                        <button className="btn-details" onClick={onClickDeleteHandler}>
                            Delete
                        </button>

                    </>
                )}

                {showEditMode && postData && (
                    <div className="edit-mode">
                        <div className="edit-mode-content">
                            <div className="edit-mode-body">
                                <form onSubmit={onClickSaveEditHandler}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={postData.title}
                                            onChange={(e) => inputChangeHandler(e, 'post')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="content">Content:</label>
                                        <textarea
                                            name="content"
                                            value={postData.content}
                                            onChange={(e) => inputChangeHandler(e, 'post')}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imageUrl">ImageUrl:</label>
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={postData.imageUrl}
                                            onChange={(e) => inputChangeHandler(e, 'post')}
                                        />
                                    </div>
                                    {/* Add other form fields here */}
                                    <button type="submit" className="post-button">
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {expanded && (
                    <div className="details-section">
                        <div className="comments-section">
                            {user && <form className="comment-form" onSubmit={commentSubmitHandler}>
                                <div className="form-group">
                                    <label htmlFor="comment">Comment:</label>
                                    <textarea
                                        className="comment-input"
                                        id="comment"
                                        name="comment"
                                        rows="3"
                                        placeholder="Write your comment here..."
                                        value={newComment[commentFormKeys.Comment]}
                                        onChange={(e) => inputChangeHandler(e, 'comment')}
                                    ></textarea>
                                </div>
                                <button type="submit" className="comment-button">
                                    Add Comment
                                </button>
                            </form>}
                            {comments?.length > 0 ? (
                                <ul className="comment-list">
                                    {comments.map((comment) => (
                                        <li key={comment._id} className="comment">
                                            {comment.comment} - {comment.Author}

                                            {user && comment.Author === user.username && (
                                                <div className="comment-buttons">
                                                    <button className="edit-comment-button" onClick={() => handleEditComment(comment)}>Edit Comment</button>
                                                    <button className="delete-comment-button" onClick={() => onClickDeleteComment(comment)}>Delete Comment</button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                        <div className="interaction-section">
                            {user && <button className={`like-button ${liked ? 'liked' : ''}`} onClick={likeClickHandler}>
                                {liked ? 'Liked' : 'Like'}
                            </button>}

                        </div>
                        <span className="like-count">{likes.length} {likes.length === 1 ? 'like' : 'likes'}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
