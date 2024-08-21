import React from 'react';
import './styles/TopTracks.css';
import text from '../config/texts';

const TopTracks = ({ tracks }) => (
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
                srcSet={`${track.album.images[1]?.url} 1x, ${track.album.images[0]?.url} 2x`} // Using higher resolution for retina screens
                alt={track.name}
                loading="lazy" // Lazy load images
              />
              <h4>{index + 1}. {track.name} <br /> {track.artists[0]?.name}</h4>
            </a>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TopTracks;