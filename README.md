# Rhythm Recap

## Overview

This is a React application that allows users to view their top tracks and artists from Spotify. Users can log in with their Spotify account, select different time ranges, and adjust the number of results to fetch. The app displays the top tracks and artists based on the user's Spotify data.

## Why
I made a very similar project with JavaScript and HTML, but it felt old. I wanted to learn more about React, so I made it again with React. I couldn't find many websites that used React to show Spotify music. So, I made a website that shows the most popular songs and artists.

This website is a good start for showing top songs and artists. You can choose to see data from the last 4 weeks, last 6 months, or all time. It also has a slider to show the results. It's made entirely with React and uses good ways to make it fast and use less memory. This website is a good base for anyone who wants to make similar websites or learn more about React.

The old project for reference: https://github.com/dragonGR/spotify-stats

## Features

- **Spotify Authentication**: Log in using your Spotify account to access your top tracks and artists.
- **Time Range Selection**: Choose from different time ranges to view top tracks and artists:
  - Last 4 weeks
  - Last 6 months
  - All time
- **Result Limit Control**: Adjust the number of results displayed from 1 to 50.
- **Dynamic Data Fetching**: Fetch and display top tracks and artists based on user preferences.
- **Error Handling**: Graceful error handling and user feedback if data fetching fails.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dragonGR/RhythmRecap.git
   cd RhythmRecap
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up enviroment variables:
Modify the existing `.env` file in the root of the project, this is an example:
```env
REACT_APP_CLIENT_ID=your_spotify_client_id
REACT_APP_REDIRECT_URI=your_redirect_uri
REACT_APP_SCOPES=your_scopes
REACT_APP_SPOTIFY_AUTH_URL=https://accounts.spotify.com/authorize?response_type=token&client_id=%s&scope=%s&redirect_uri=%s
REACT_APP_SPOTIFY_API_BASE_URL=https://api.spotify.com/v1
REACT_APP_SPOTIFY_API_TOP_TRACKS_ENDPOINT="/top/tracks"
REACT_APP_SPOTIFY_API_TOP_ARTISTS_ENDPOINT="/top/artists"
```
Replace the placeholders with your actual Spotify application details.

4. Start the development server:
```bash
npm start
```
The app will be usually available at 'http://localhost:3000'.

## Components
#### `App.js`
- Purpose: Main component that handles authentication, data fetching, and rendering of the app based on user state.
    - Key Functions:
       - handleLogin: Redirects users to Spotify's login page.
        - fetchTopTracksData: Fetches top tracks data from Spotify.
        - fetchTopArtistsData: Fetches top artists data from Spotify.

#### `Controls.js`
 - Purpose: Provides UI elements for selecting time range and result limit, and buttons to fetch top tracks and artists.
     - Key Functions:
        - handleRangeChange: Updates the result limit based on slider input.
        - handleFetchTopTracks: Fetches top tracks data.
        - handleFetchTopArtists: Fetches top artists data.

#### `Results.js`
- Purpose: Displays the results of the data fetch, showing either top tracks or top artists.
    - Key Components:
        - TopTracks: Renders a list of top tracks.
        - TopArtists: Renders a list of top artists.
        - Spinner: Displays a loading spinner while data is being fetched.

#### `ErrorBoundary.js`
- Purpose: Catches JavaScript errors anywhere in the app and displays a fallback UI.
    - Key Features:
        - Catches errors during rendering, lifecycle methods, and constructors.

#### `Login.js`
- Purpose: Provides a login button to initiate the Spotify authentication process.
    - Key Features:
        Calls handleLogin to redirect users to Spotify's login page.

#### `TopArtists.js`
- Purpose: Renders a list of top artists with links to their Spotify profiles.
    - Key Features:
        - Displays artist names and images, with links to their Spotify pages.

#### `TopTracks.js`
- Purpose: Renders a list of top tracks with links to their Spotify profiles.
    - Key Features:
        - Displays track names, artists, and album images, with links to Spotify pages.

#### `Spinner.js`
- Purpose: Provides a loading spinner while data is being fetched.

#### `spotifyService.js`
- Purpose: Contains functions to interact with the Spotify Web API. It abstracts the API requests for fetching top tracks and top artists.
    - Key Features:
      - fetchTopTracks: Sends a GET request to the Spotify API to retrieve the user's top tracks based on specified time range and result limit.
      - fetchTopArtists: Sends a GET request to the Spotify API to retrieve the user's top artists based on specified time range and result limit.
      - 

#### `texts.js`
- Texts: All text strings used in the app are located in src/config/texts.js. Customize these texts as needed for different languages or styles.
