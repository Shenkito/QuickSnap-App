import { useAuth } from '../../context/AuthContext';

import './Profile.css';

const Profile = () => {

    const { user } = useAuth();

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img className="profile-image" src={user.profileImage} alt="Profile" />
                    <h2>{user.username}</h2>
                    <p className="email">Email: {user.email}</p>
                </div>
                <div className="profile-details">
                    <h3>Bio:</h3>
                    <p>{user.bio}</p>
                    {/* Add more profile details here */}
                </div>
                {/* Add more sections for additional user details */}
            </div>
        </div>
    );
};

export default Profile;