import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import * as commentService from '../../services/commentService';
import * as postService from '../../services/postService';

import './PostCard.css';

const commentFormKeys = {
    Comment: 'comment',
};

export default function PostCard({ imageUrl, title, content, Author, _ownerId, _id, description, updateEditPostHandler, updateDeletePostHandler }) {
    const { user } = useAuth();
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
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

    // useEffect(() => {
    //     async function fetchComments() {
    //         try {
    //             const fetchedComments = await commentService.getByPostId(_id);
    //             setComments(fetchedComments);
    //         } catch (error) {
    //             console.error('Error fetching comments:', error);
    //         }
    //     }

    //     fetchComments();
    // }, [_id]);

    useEffect(() => {
        async function fetchData() {
            if (expanded) {

                const fetchedComments = await commentService.getByPostId(_id);
                setComments(fetchedComments);
            }

        }
        fetchData();
    }, [expanded]); // Or [] if effect doesn't need props or state

    const toggleExpand = () => {
        setExpanded(!expanded);
        // console.log(expanded);
        // const fetchedComments = await commentService.getByPostId(_id);
        // setComments(fetchedComments);

    };

    const likeClickHandler = () => {
        setLiked(!liked);
        // Logic for handling like button click
        // Add the logic here to handle liking posts
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
            console.log(error);
        }
    };


    const onClickEditHandler = async () => {
        try {
            const post = await postService.getOne(_id)
            console.log('Retrieved post for editing:', post);

            setPostData(post);
            setShowEditMode(true)
        } catch (error) {
            console.error('Error while fetching post for editing:', error);
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
            } catch (error) {
                console.log(error);
            }
        }
    }

    const onClickDeleteHandler = async (e) => {
        e.preventDefault();

        const hasConfirmed = confirm(`Do you want to delete ${title} ?`)

        if (hasConfirmed) {

            try {
                const post = await postService.remove(_id);
                // updateDeletePostHandler(post)
                navigate('/posts')
            } catch (error) {
                console.log(error);
            }
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
                        {/* Modal content here, use postData to display the fetched post */}
                        <div className="edit-mode-content">
                            <div className="edit-mode-body">
                                <form onSubmit={onClickSaveEditHandler}>
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={postData.title}
                                            onChange={(e) => inputChangeHandler(e, 'post')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Content:</label>
                                        <textarea
                                            name="content"
                                            value={postData.content}
                                            onChange={(e) => inputChangeHandler(e, 'post')}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>ImageUrl:</label>
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
                        <span className="like-count">'Display likes here'</span>
                    </div>
                )}
            </div>
        </div>
    );
}
