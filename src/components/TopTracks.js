import React, { useState, useRef, useCallback } from 'react';
import './styles/TopTracks.css';
import text from '../config/texts';
import { ReactComponent as PlayIcon } from '../icons/play.svg'; // Example icon
import { ReactComponent as PauseIcon } from '../icons/pause.svg'; // Example icon

const TopTracks = React.memo(({ tracks }) => {
  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRefs = useRef({});

  const handlePlayPause = useCallback((trackId) => {
    const audio = audioRefs.current[trackId];

    if (playingTrack === trackId) {
      // Pause if the same track is already playing
      audio.pause();
      setPlayingTrack(null);
    } else {
      // Pause previously playing track if there is one
      if (playingTrack !== null) {
        audioRefs.current[playingTrack]?.pause();
      }
      // Reset playback position and play new track
      audio.currentTime = 0;
      audio.play();
      setPlayingTrack(trackId);
    }
  }, [playingTrack]);

  return (
    <div className="top-tracks">
      <h2>{text.topTracks.title}</h2>
      <div className="results" aria-live="polite">
        {tracks.length === 0 ? (
          <div>{text.topTracks.noTracksFound}</div>
        ) : (
          tracks.map((track, index) => (
            <div key={track.id} className="track-item">
              <a 
                href={track.external_urls.spotify} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Listen to ${track.name} by ${track.artists[0]?.name}`}
              >
                <img 
                  src={track.album.images[1]?.url}
                  srcSet={`${track.album.images[1]?.url} 1x, ${track.album.images[0]?.url} 2x`} 
                  alt={track.name}
                  loading="lazy" 
                />
                <h4>{index + 1}. {track.name} <br /> {track.artists[0]?.name}</h4>
              </a>
              {track.preview_url && (
                <div className="audio-player">
                  <audio 
                    ref={el => audioRefs.current[track.id] = el}
                    src={track.preview_url} 
                    aria-label={`Audio preview for ${track.name}`}
                  />
                  <button 
                    className="play-pause-button" 
                    onClick={() => handlePlayPause(track.id)}
                    aria-label={playingTrack === track.id ? 'Pause' : 'Play'}
                  >
                    {playingTrack === track.id ? <PauseIcon className="icon" /> : <PlayIcon className="icon" />}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default TopTracks;