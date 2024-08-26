import React, { useState, useCallback } from 'react';
import './styles/Controls.css';
import text from '../config/texts';
import { fetchTopTracks, fetchTopArtists, createPlaylist, addTracksToPlaylist } from '../services/spotifyService';

const Controls = ({ 
  accessToken, 
  stats, 
  userProfile = {}, // avoid null errors
  setView, 
  setStats, 
  setLoading, 
  setError, 
  setShowCreatePlaylist, 
  showCreatePlaylist 
}) => {
  const [timeRange, setTimeRange] = useState('short_term');
  const [limit, setLimit] = useState(20);
  const [sliderValue, setSliderValue] = useState(20);

  const fetchTopTracksData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTopTracks(accessToken, timeRange, limit);
      setStats((prevStats) => ({ ...prevStats, tracks: response.data.items }));
      setView('tracks');
      setShowCreatePlaylist(true);
    } catch (error) {
      setError(text.app.fetchTopTracksError);
    } finally {
      setLoading(false);
    }
  }, [accessToken, timeRange, limit, setStats, setView, setShowCreatePlaylist, setError, setLoading]);

  const fetchTopArtistsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTopArtists(accessToken, timeRange, limit);
      setStats((prevStats) => ({ ...prevStats, artists: response.data.items }));
      setView('artists');
      setShowCreatePlaylist(false);
    } catch (error) {
      setError(text.app.fetchTopArtistsError);
    } finally {
      setLoading(false);
    }
  }, [accessToken, timeRange, limit, setStats, setView, setShowCreatePlaylist, setError, setLoading]);

  const handleCreatePlaylist = useCallback(async () => {
    if (!stats.tracks.length) {
      setError(text.app.fetchTopTracksError);
      return;
    }

    if (!userProfile?.id) { // Check if userProfile.id exists
      setError(text.app.userProfileError); // Handle the error gracefully
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
  }, [accessToken, stats.tracks, userProfile?.id, setError, setLoading]);

  const handleRangeChange = useCallback((e) => {
    const value = e.target.value;
    setSliderValue(value);
    setLimit(value);
  }, [setLimit]);

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
            value={sliderValue}
            className="range-slider"
            onChange={handleRangeChange}
          />
          <span className="slider-value">{sliderValue}</span>
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