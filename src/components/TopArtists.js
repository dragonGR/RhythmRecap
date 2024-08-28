import React from 'react';
import './styles/TopArtists.css';
import text from '../config/texts';

const TopArtists = ({ artists }) => (
  <div className="top-artists">
    <h2>{text.topArtists.title}</h2>
    <div className="results">
      {artists.length === 0 ? (
        <div>{text.topArtists.noArtistsFound}</div>
      ) : (
        artists.map((artist, index) => (
          <div key={artist.id} className="artist-item" role="listitem">
            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${artist.name}`}>
              <img 
                src={artist.images[1]?.url}
                srcSet={`${artist.images[1]?.url} 1x, ${artist.images[0]?.url} 2x`} 
                alt={artist.name} // Descriptive alt text
                loading="lazy" // Lazy load images
              />
              <h4>{index + 1}. {artist.name}</h4>
            </a>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TopArtists;
