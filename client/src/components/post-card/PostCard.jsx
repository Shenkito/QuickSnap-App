import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as commentService from '../../services/commentService';
import * as postService from '../../services/postService';

import './PostCard.css';

const commentFormKeys = {
    Comment: 'comment',
};

export default function PostCard({ imageUrl, title, content, Author, _ownerId, _id, description }) {
    const { user } = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        [commentFormKeys.Comment]: '',
        Author: user ? user.username : '',
        PostId: _id,
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

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value,
        });
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

    const onClickEditHandler = async (postId) => {
        try {
            const post = await postService.getOne(_id)
            console.log('Retrieved post for editing:', post);
        } catch (error) {
            console.error('Error while fetching post for editing:', error);
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
                <button className="btn-details" onClick={user ? toggleExpand : null}>
                    {expanded ? 'See Less' : 'See Details'}
                </button>
                <button className="btn-details" onClick={onClickEditHandler}>
                    Edit
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
                                        value={newComment[commentFormKeys.Comment]}
                                        onChange={inputChangeHandler}
                                    ></textarea>
                                </div>
                                <button type="submit" className="comment-button">
                                    Add Comment
                                </button>
                            </form>
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
