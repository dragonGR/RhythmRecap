import React from 'react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import Spinner from './Spinner';
import './styles/Results.css'; // Import the new CSS file

const Results = ({ view, stats, isLoading }) => {
  // Show spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  // Display TopTracks if 'tracks' view is selected
  if (view === 'tracks') {
    return (
      <div className="results-container">
        <TopTracks tracks={stats.tracks} />
      </div>
    );
  }

  // Display TopArtists if 'artists' view is selected
  if (view === 'artists') {
    return (
      <div className="results-container">
        <TopArtists artists={stats.artists} />
      </div>
    );
  }

  // Return null if no view is selected
  return null;
};

export default Results;
