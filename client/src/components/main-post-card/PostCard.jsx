import './PostCard.css';

export default function PostCard({ imageUrl, title, content, author }) {
    return (
        <div className="col">
            <div className="card h-100">
                <img src={imageUrl} className="card-img-top" alt="Post" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{content}</p>
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary">Author: {author}</small>
                </div>
            </div>
        </div>
    );
}