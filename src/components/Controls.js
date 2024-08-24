import React, { useState, useCallback } from 'react';
import './styles/Controls.css';
import text from '../config/texts';

const Controls = ({ setTimeRange, setLimit, fetchTopTracks, fetchTopArtists, createPlaylist, showCreatePlaylist }) => {
  const [sliderValue, setSliderValue] = useState(20);

  // Memoize the range change handler
  const handleRangeChange = useCallback((e) => {
    const value = e.target.value;
    setSliderValue(value);
    setLimit(value);
  }, [setLimit]);

  // Memoize the fetchTopTracks handler
  const handleFetchTopTracks = useCallback(() => {
    fetchTopTracks();
  }, [fetchTopTracks]);

  // Memoize the fetchTopArtists handler
  const handleFetchTopArtists = useCallback(() => {
    fetchTopArtists();
  }, [fetchTopArtists]);

    // Memoize the handleCreatePlaylist handlers
    const handleCreatePlaylist = useCallback(() => {
      createPlaylist();
    }, [createPlaylist]);
    
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
              defaultChecked
              onChange={(e) => setTimeRange(e.target.value)}
            />
            <span>{text.controls.last4Weeks}</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="time"
              value="medium_term"
              onChange={(e) => setTimeRange(e.target.value)}
            />
            <span>{text.controls.last6Months}</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="time"
              value="long_term"
              onChange={(e) => setTimeRange(e.target.value)}
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
        <button className="fetch-button" onClick={handleFetchTopTracks}>
          {text.controls.fetchTopTracksButton}
        </button>
        <button className="fetch-button" onClick={handleFetchTopArtists}>
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