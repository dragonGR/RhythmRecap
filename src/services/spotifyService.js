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

// Fetches User profile from the Spotify API
export const fetchUserProfile = (accessToken) => {
  return axios.get(`${process.env.REACT_APP_SPOTIFY_API_FETCH_PROFILE}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// Create a new playlist
export const createPlaylist = async (accessToken, userId, playlistName) => {
  const url = `${process.env.REACT_APP_SPOTIFY_API_CREATE_PLAYLIST}/users/${userId}/playlists`;
  const payload = {
    name: playlistName,
    public: false // Set to true if you want the playlist to be public
  };

  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

// Adds tracks to the playlist
export const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {
  const url = `${process.env.REACT_APP_SPOTIFY_API_CREATE_PLAYLIST}/playlists/${playlistId}/tracks`;
  return axios.post(
    url,
    {
      uris: trackUris,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
};
