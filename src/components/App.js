import React, { useState, useEffect, Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';
import text from '../config/texts';
import { fetchTopTracks, fetchTopArtists, fetchUserProfile, createPlaylist, addTracksToPlaylist} from '../services/spotifyService';
import './styles/App.css';

const Login = lazy(() => import('./Login'));
const Controls = lazy(() => import('./Controls'));
const Results = lazy(() => import('./Results'));
const UserProfile = lazy(() => import('./UserProfile'));

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [timeRange, setTimeRange] = useState('short_term');
  const [limit, setLimit] = useState(20);
  const [stats, setStats] = useState({ tracks: [], artists: [] });
  const [view, setView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
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
        .catch((err) => {
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

  const fetchTopTracksData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTopTracks(accessToken, timeRange, limit);
      setStats((prevStats) => ({ ...prevStats, tracks: response.data.items }));
      setView('tracks');
      setDataFetched(true);
      setShowCreatePlaylist(true);
    } catch (error) {
      setError(text.app.fetchTopTracksError);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopArtistsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTopArtists(accessToken, timeRange, limit);
      setStats((prevStats) => ({ ...prevStats, artists: response.data.items }));
      setView('artists');
      setDataFetched(true);
    } catch (error) {
      setError(text.app.fetchTopArtistsError);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!stats.tracks.length) {
      setError(text.app.fetchTopTracksError);
      return;
    }

    setLoading(true);
    try {
      const playlistResponse = await createPlaylist(accessToken, userProfile.id, 'My Top Tracks Playlist');
      const playlistId = playlistResponse.data.id;

      const trackUris = stats.tracks.map(track => track.uri);
      await addTracksToPlaylist(accessToken, playlistId, trackUris);

      setError(null);
      alert(text.app.playlistCreationSuccess);
    } catch (err) {
      setError(text.app.playlistCreationError);
    } finally {
      setLoading(false);
    }
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
                setTimeRange={setTimeRange} 
                setLimit={setLimit} 
                fetchTopTracks={fetchTopTracksData} 
                fetchTopArtists={fetchTopArtistsData}
                createPlaylist={handleCreatePlaylist}
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