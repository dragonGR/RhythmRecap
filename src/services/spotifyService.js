import axios from 'axios';

// Fetches top tracks from the Spotify API
export const fetchTopTracks = async (accessToken, timeRange, limit) => {
  const url = `${process.env.REACT_APP_SPOTIFY_API_BASE_URL}${process.env.REACT_APP_SPOTIFY_API_TOP_TRACKS_ENDPOINT}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { limit, time_range: timeRange },
  });
};

// Fetches top artists from the Spotify API 
export const fetchTopArtists = async (accessToken, timeRange, limit) => {
  const url = `${process.env.REACT_APP_SPOTIFY_API_BASE_URL}${process.env.REACT_APP_SPOTIFY_API_TOP_ARTISTS_ENDPOINT}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { limit, time_range: timeRange },
  });
};