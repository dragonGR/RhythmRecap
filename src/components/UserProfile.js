import React from 'react';
import text from '../config/texts';
import './styles/UserProfile.css';

const UserProfile = ({ profile }) => {
  // Handler to open Spotify profile in a new tab
  const handleProfileClick = () => {
    window.open(profile.external_urls.spotify, '_blank');
  };

  return (
    <div className="user-profile">
      <div className="profile-banner">
        <div className="profile-image-container" onClick={handleProfileClick}>
          <img 
            src={profile.images[0]?.url} 
            alt={`${profile.display_name}'s profile`} 
            className="profile-image"
          />
        </div>
        <div className="profile-details">
          <h2 className="profile-name">{profile.display_name}</h2>
          <p className="profile-info">
            <strong>{profile.followers.total}</strong> {text.userProfile.followersLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;