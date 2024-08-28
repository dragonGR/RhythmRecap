import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.substring(1)).get('access_token');
    if (token) {
      setAccessToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);

      // Fetch user profile data
      fetchUserProfile(token)
        .then((profile) => setUserProfile(profile.data))
        .catch(() => setError(text.app.fetchUserProfileError));
    }
  }, []);

  const handleLogin = () => {
    const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI, REACT_APP_SCOPES, REACT_APP_SPOTIFY_AUTH_URL } = process.env;

    const url = REACT_APP_SPOTIFY_AUTH_URL
      .replace('%s', encodeURIComponent(REACT_APP_CLIENT_ID))
      .replace('%s', encodeURIComponent(REACT_APP_SCOPES))
      .replace('%s', encodeURIComponent(REACT_APP_REDIRECT_URI));

    window.location = url;
  };

    // Memoize derived data | Will be enhanced
    const filteredTracks = useMemo(() => {
      return tracks;
    }, [tracks]);
  
    const filteredArtists = useMemo(() => {
      return artists;
    }, [artists]);

    return (
      <div className="App">
        <Suspense fallback={<div>Loading components...</div>}>
          {!accessToken ? (
            <Login handleLogin={handleLogin} />
          ) : (
            <>
              {userProfile && <UserProfile profile={userProfile} />}
              <Controls 
                accessToken={accessToken}
                tracks={tracks}
                setTracks={setTracks}
                setArtists={setArtists}
                userProfile={userProfile}
                setView={setView}
                setLoading={setLoading}
                setError={setError}
                setShowCreatePlaylist={setShowCreatePlaylist}
                showCreatePlaylist={showCreatePlaylist}
              />
              {error && <div className="error">{error}</div>}
              <Results view={view} tracks={filteredTracks} artists={filteredArtists} isLoading={loading} />
            </>
          )}
        </Suspense>
      </div>
    );
  }
  
  export default App;
