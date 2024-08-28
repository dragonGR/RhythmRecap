# Rhythm Recap

## Overview

This is a React application that allows users to view their top tracks and artists from Spotify. Users can log in with their Spotify account, select different time ranges, and adjust the number of results to fetch. The app displays the top tracks and artists based on the user's Spotify data. Users can also play a preview of each of their top songs.

## Why
I made a very similar project with JavaScript and HTML, but it felt old. I wanted to learn more about React, so I made it again with React. I couldn't find many websites that used React to show Spotify music. So, I made a website that shows the most popular songs and artists.

This website is a great starting point for showcasing top songs and artists. You can choose to view data from the last 4 weeks, the last 6 months, or all time. It also features a slider to display the results. I am making an effort to separate each feature into individual commits, so anyone can see how it's done. The website is built entirely with React and uses efficient techniques to enhance performance and reduce memory usage. It serves as a solid foundation for anyone looking to create similar websites or learn more about React.

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
- **Playlist Creation**: Option to create a playlist from top tracks.

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
REACT_APP_SPOTIFY_AUTH_URL=the_auth_url

Endpoints:
REACT_APP_SPOTIFY_API_BASE_URL="
REACT_APP_SPOTIFY_API_TOP_TRACKS_ENDPOINT="
REACT_APP_SPOTIFY_API_TOP_ARTISTS_ENDPOINT="
```
Replace the placeholders with your actual Spotify application details.

4. Start the development server:
```bash
npm start
```
The app will be usually available at 'http://localhost:3000'.
exts as needed for different languages or styles.