import React, { useState, useCallback } from 'react';
import './styles/Controls.css';
import text from '../config/texts';
import { fetchTopTracks, fetchTopArtists, createPlaylist, addTracksToPlaylist } from '../services/spotifyService';

const Controls = ({ 
  accessToken, 
  tracks, 
  artists, 
  setTracks, 
  setArtists, 
  userProfile, 
  setView, 
  setLoading, 
  setError, 
  showCreatePlaylist, 
  setShowCreatePlaylist 
}) => {
  const [timeRange, setTimeRange] = useState('short_term');
  const [limit, setLimit] = useState(20);

  const handleFetchData = useCallback(async (fetchDataFunc, setDataFunc, viewType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDataFunc(accessToken, timeRange, limit);
      setDataFunc(response.data.items);
      setView(viewType);
      setShowCreatePlaylist(viewType === 'tracks');
    } catch {
      setError(viewType === 'tracks' ? text.app.fetchTopTracksError : text.app.fetchTopArtistsError);
    } finally {
      setLoading(false);
    }
  }, [accessToken, timeRange, limit, setView, setShowCreatePlaylist, setError, setLoading]);

  const fetchTopTracksData = () => handleFetchData(fetchTopTracks, setTracks, 'tracks');
  const fetchTopArtistsData = () => handleFetchData(fetchTopArtists, setArtists, 'artists');

  const handleCreatePlaylist = useCallback(async () => {
    if (!tracks.length || !userProfile?.id) {
      setError(!tracks.length ? text.app.noTracksError : text.app.userProfileError);
      return;
    }

    setLoading(true);
    try {
      const playlistResponse = await createPlaylist(accessToken, userProfile.id, 'My Top Tracks Playlist');
      const playlistId = playlistResponse.data.id;
      const trackUris = tracks.map(track => track.uri);
      await addTracksToPlaylist(accessToken, playlistId, trackUris);
      alert(text.app.playlistCreationSuccess);
    } catch {
      setError(text.app.playlistCreationError);
    } finally {
      setLoading(false);
    }
  }, [accessToken, tracks, userProfile?.id, setError, setLoading]);

  return (
    <div className="controls-container">
      <div className="controls-section">
        <p className="controls-label">{text.controls.timeRangeLabel}</p>
        <div className="radio-group">
          {['short_term', 'medium_term', 'long_term'].map(range => (
            <label key={range} className="radio-option">
              <input
                type="radio"
                name="time"
                value={range}
                checked={timeRange === range}
                onChange={(e) => setTimeRange(e.target.value)}
              />
              <span>{text.controls[range === 'short_term' ? 'last4Weeks' : range === 'medium_term' ? 'last6Months' : 'allTime']}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="controls-section">
        <p className="controls-label">{text.controls.numberOfResultsLabel}</p>
        <div className="range-slider-container">
          <input
            type="range"
            min="1"
            max="50"
            value={limit}
            className="range-slider"
            onChange={(e) => setLimit(e.target.value)}
          />
          <span className="slider-value">{limit}</span>
        </div>
      </div>
      <div className="controls-buttons">
        <button className="fetch-button" onClick={fetchTopTracksData}>
          {text.controls.fetchTopTracksButton}
        </button>
        <button className="fetch-button" onClick={fetchTopArtistsData}>
          {text.controls.fetchTopArtistsButton}
        </button>
        {showCreatePlaylist && (
          <button className="create-playlist-button" onClick={handleCreatePlaylist}>
            {text.controls.createPlaylistButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;