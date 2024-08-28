import React from 'react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import Spinner from './Spinner';
import './styles/Results.css';

const Results = ({ view, tracks, artists, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (view === 'tracks') {
    return (
      <div className="results-container">
        <TopTracks tracks={tracks} />
      </div>
    );
  }

  if (view === 'artists') {
    return (
      <div className="results-container">
        <TopArtists artists={artists} />
      </div>
    );
  }

  return null; // Return null if no view is selected
};

export default Results;
