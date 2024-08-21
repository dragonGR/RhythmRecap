import React from 'react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import Spinner from './Spinner';

const Results = ({ view, stats, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (view === 'tracks') {
    return (
      <div className="results-container">
        <TopTracks tracks={stats.tracks} />
      </div>
    );
  }

  if (view === 'artists') {
    return (
      <div className="results-container">
        <TopArtists artists={stats.artists} />
      </div>
    );
  }

  return null; // Return null if no view is set
};

export default Results;