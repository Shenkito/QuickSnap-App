import React, { useState } from 'react';
import './PostCard.css';

export default function PostCard({ imageUrl, title, content, _ownerId, _id, description }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`col`}>
            <div className={`card`}>
                <img src={imageUrl} className="card-img-top" alt="Post" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className={`card-text ${expanded ? 'expanded' : ''}`}>
                        {expanded ? content : description}
                    </p>
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary">Author: {_ownerId}</small>
                </div>
                <button className="btn-details" onClick={toggleExpand}>
                    {expanded ? 'See Less' : 'See Details'}
                </button>
            </div>
        </div>
    );
}
