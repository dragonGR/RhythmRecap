import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import text from '../config/texts';
import { fetchUserProfile } from '../services/spotifyService';
import './styles/App.css';

const Login = lazy(() => import('./Login'));
const Controls = lazy(() => import('./Controls'));
const Results = lazy(() => import('./Results'));
const UserProfile = lazy(() => import('./UserProfile'));

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [view, setView] = useState(null);
  const [loading, setLoading] = useState(false); // To be used for fetching tracks/artists
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // Profile is fetched once
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.substring(1)).get('access_token');
    if (token) {
      setAccessToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);

      // Fetch user profile only once after login
      if (!userProfile) {
        const fetchProfile = async () => {
          try {
            const profile = await fetchUserProfile(token);
            setUserProfile(profile.data); // Set user profile once
          } catch (err) {
            setError(text.app.fetchUserProfileError);
          }
        };
        fetchProfile();
      }
    }
  }, [userProfile]); // Run only when the user profile is not already fetched

  const handleLogin = useCallback(() => {
    const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI, REACT_APP_SCOPES, REACT_APP_SPOTIFY_AUTH_URL } = process.env;
    if (!REACT_APP_CLIENT_ID || !REACT_APP_REDIRECT_URI || !REACT_APP_SCOPES || !REACT_APP_SPOTIFY_AUTH_URL) {
      console.error('Environment variables for Spotify authentication are missing.');
      return;
    }
    
    const url = REACT_APP_SPOTIFY_AUTH_URL
      .replace('%s', encodeURIComponent(REACT_APP_CLIENT_ID))
      .replace('%s', encodeURIComponent(REACT_APP_SCOPES))
      .replace('%s', encodeURIComponent(REACT_APP_REDIRECT_URI));

    window.location = url;
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading components...</div>}>
        {!accessToken ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <>
            {userProfile && <UserProfile profile={userProfile} />} {/* Show profile if available */}
            <Controls 
              accessToken={accessToken}
              tracks={tracks}
              setTracks={setTracks}
              setArtists={setArtists}
              userProfile={userProfile}
              setView={setView}
              setLoading={setLoading}  // Loading state for fetching tracks/artists
              setError={setError}
              setShowCreatePlaylist={setShowCreatePlaylist}
              showCreatePlaylist={showCreatePlaylist}
            />
            {error && <div className="error">{error}</div>}
            <Results view={view} tracks={tracks} artists={artists} isLoading={loading} />
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;