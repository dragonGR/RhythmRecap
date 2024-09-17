import React from 'react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import Spinner from './Spinner';
import './styles/Results.css';

const Results = ({ view, tracks, artists, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }

  const renderContent = () => {
    switch (view) {
      case 'tracks':
        return <TopTracks tracks={tracks} />;
      case 'artists':
        return <TopArtists artists={artists} />;
      default:
        return null;
    }
  };

  return (
    <div className="results-container">
      {renderContent()}
    </div>
  );
};

export default Results;
