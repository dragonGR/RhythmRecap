import React, { useState } from 'react';
import './styles/TopTracks.css';
import text from '../config/texts';
import { ReactComponent as PlayIcon } from '../icons/play.svg'; // Example icon
import { ReactComponent as PauseIcon } from '../icons/pause.svg'; // Example icon

const TopTracks = ({ tracks }) => {
  const [playingTrack, setPlayingTrack] = useState(null);

  const handlePlayPause = (trackId) => {
    const audio = document.getElementById(`audio-${trackId}`);

    if (playingTrack === trackId) {
      // Pause if the same track is already playing
      audio.pause();
      setPlayingTrack(null);
    } else {
      // Play new track
      if (playingTrack !== null) {
        // Pause previously playing track
        const prevAudio = document.getElementById(`audio-${playingTrack}`);
        prevAudio.pause();
      }
      audio.play();
      setPlayingTrack(trackId);
    }
  };

  return (
    <div className="top-tracks">
      <h2>{text.topTracks.title}</h2>
      <div className="results">
        {tracks.length === 0 ? (
          <div>{text.topTracks.noTracksFound}</div>
        ) : (
          tracks.map((track, index) => (
            <div key={track.id} className="track-item">
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
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
                  <audio id={`audio-${track.id}`} src={track.preview_url} />
                  <button 
                    className="play-pause-button" 
                    onClick={() => handlePlayPause(track.id)}
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
};

export default TopTracks;
