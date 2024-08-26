import React, { useState, useEffect, Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';
import text from '../config/texts';
import { fetchUserProfile } from '../services/spotifyService';
import './styles/App.css';

const Login = lazy(() => import('./Login'));
const Controls = lazy(() => import('./Controls'));
const Results = lazy(() => import('./Results'));
const UserProfile = lazy(() => import('./UserProfile'));

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [stats, setStats] = useState({ tracks: [], artists: [] });
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
        .catch(() => {
          setError(text.app.fetchUserProfileError);
        });
    }
  }, []);

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const scopes = process.env.REACT_APP_SCOPES;

    const url = process.env.REACT_APP_SPOTIFY_AUTH_URL
      .replace('%s', encodeURIComponent(clientId))
      .replace('%s', encodeURIComponent(scopes))
      .replace('%s', encodeURIComponent(redirectUri));

    window.location = url;
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          {!accessToken ? (
            <Login handleLogin={handleLogin} />
          ) : (
            <>
              {userProfile && <UserProfile profile={userProfile} />}
              <Controls 
                accessToken={accessToken}
                stats={stats}
                userProfile={userProfile}
                setView={setView}
                setStats={setStats}
                setLoading={setLoading}
                setError={setError}
                setShowCreatePlaylist={setShowCreatePlaylist}
                showCreatePlaylist={showCreatePlaylist}
              />
              {error && <div className="error">{error}</div>}
              <Results view={view} stats={stats} isLoading={loading} />
            </>
          )}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;