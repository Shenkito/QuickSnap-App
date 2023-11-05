export default function ProfilePage() {
    return (
        <div>
            <div className="profile-header">
                <img
                    src="https://via.placeholder.com/150" // Placeholder image URL
                    alt="User Profile"
                    className="profile-picture"
                />
                <h1 className="profile-username">Username</h1>
                <p className="profile-email">user@example.com</p>
                <button className="edit-button">Edit</button>
            </div>

            <div className="container">
                <div className="section-header">
                    <h2>Your Profile</h2>
                </div>
                <div className="profile-info">
                    <div className="info-item">
                        <span>Name:</span>
                        <span>Your Name</span>
                    </div>
                    <div className="info-item">
                        <span>Country:</span>
                        <span>Your Country</span>
                    </div>
                    <div className="info-item">
                        <span>City:</span>
                        <span>Your City</span>
                    </div>
                </div>

                <div className="section-header">
                    <h2>Your Posts</h2>
                </div>
                <div className="posts">
                    <div className="post">
                        <h3>Post Title 1</h3>
                        <p>This is your first post.</p>
                    </div>
                    <div className="post">
                        <h3>Post Title 2</h3>
                        <p>This is your second post.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}