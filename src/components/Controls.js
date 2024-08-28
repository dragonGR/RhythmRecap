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

  const fetchTopTracksData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTopTracks(accessToken, timeRange, limit);
      setTracks(response.data.items);
      setView('tracks');
      setShowCreatePlaylist(true);
    } catch (error) {
      setError(text.app.fetchTopTracksError);
    } finally {
      setLoading(false);
    }
  }, [accessToken, timeRange, limit, setTracks, setView, setShowCreatePlaylist, setError, setLoading]);

  const fetchTopArtistsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTopArtists(accessToken, timeRange, limit);
      setArtists(response.data.items);
      setView('artists');
      setShowCreatePlaylist(false);
    } catch (error) {
      setError(text.app.fetchTopArtistsError);
    } finally {
      setLoading(false);
    }
  }, [accessToken, timeRange, limit, setArtists, setView, setShowCreatePlaylist, setError, setLoading]);

  const handleCreatePlaylist = useCallback(async () => {
    if (!tracks.length) {
      setError(text.app.noTracksError);
      return;
    }

    if (!userProfile?.id) { 
      setError(text.app.userProfileError);
      return;
    }

    setLoading(true);
    try {
      const playlistResponse = await createPlaylist(accessToken, userProfile.id, 'My Top Tracks Playlist');
      const playlistId = playlistResponse.data.id;

      const trackUris = tracks.map(track => track.uri);
      await addTracksToPlaylist(accessToken, playlistId, trackUris);

      setError(null);
      alert(text.app.playlistCreationSuccess);
    } catch (err) {
      setError(text.app.playlistCreationError);
    } finally {
      setLoading(false);
    }
  }, [accessToken, tracks, userProfile?.id, setError, setLoading]);

  const handleRangeChange = useCallback((e) => {
    setLimit(e.target.value);
  }, []);

  const handleTimeRangeChange = useCallback((e) => {
    setTimeRange(e.target.value);
  }, []);

  return (
    <div className="controls-container">
      <div className="controls-section">
        <p className="controls-label">{text.controls.timeRangeLabel}</p>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="time"
              value="short_term"
              checked={timeRange === 'short_term'}
              onChange={handleTimeRangeChange}
            />
            <span>{text.controls.last4Weeks}</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="time"
              value="medium_term"
              checked={timeRange === 'medium_term'}
              onChange={handleTimeRangeChange}
            />
            <span>{text.controls.last6Months}</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="time"
              value="long_term"
              checked={timeRange === 'long_term'}
              onChange={handleTimeRangeChange}
            />
            <span>{text.controls.allTime}</span>
          </label>
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
            onChange={handleRangeChange}
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
