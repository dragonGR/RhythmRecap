import React from 'react';
import './styles/TopTracks.css';
import text from '../config/texts';

const TopTracks = ({ tracks }) => (
  <div className="top-tracks">
    <h2 className="top-tracks-title">{text.topTracks.title}</h2>
    <div className="results">
      {tracks.length === 0 ? (
        <div className="no-tracks-found">{text.topTracks.noTracksFound}</div>
      ) : (
        tracks.map((track, index) => (
          <div key={track.id} className="track-item" role="listitem">
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${track.name} by ${track.artists[0]?.name}`}>
              <img 
                src={track.album.images[1]?.url}
                srcSet={`${track.album.images[1]?.url} 1x, ${track.album.images[0]?.url} 2x`}
                alt={track.name}
                loading="lazy"
              />
              <h4 className="track-name">{index + 1}. {track.name} <br /> {track.artists[0]?.name}</h4>
            </a>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TopTracks;
