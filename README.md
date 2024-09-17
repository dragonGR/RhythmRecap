# Rhythm Recap

A React application to explore your Spotify top tracks and artists.

## Overview
This is a React application that allows users to view their top tracks and artists from Spotify. Users can log in with their Spotify account, select different time ranges, and adjust the number of results to fetch. The app displays the top tracks and artists based on the user's Spotify data. Users can also play a preview of each of their top songs.

## Why
I made a very similar project with JavaScript and HTML, but it felt old. I wanted to learn more about React, so I made it again with React. I couldn't find many websites that used React to show Spotify music. So, I made a website that shows the most popular songs and artists.

This website is a great starting point for showcasing top songs and artists. You can choose to view data from the last 4 weeks, the last 6 months, or all time. It also features a slider to display the results. I am making an effort to separate each feature into individual commits, so anyone can see how it's done. The website is built entirely with React and uses efficient techniques to enhance performance and reduce memory usage. It serves as a solid foundation for anyone looking to create similar websites or learn more about React.

The old project for reference: **https://github.com/dragonGR/spotify-stats**

## Getting a Spotify API Key
To utilize the Spotify API features within Rhythm Recap, you'll need to create a Spotify developer application and obtain an API key (Client ID) and redirect URI. Here's a step-by-step guide:

**1**. **Visit the Spotify for Developers Dashboard**: Head over to **https://developer.spotify.com/**.

**2**. **Sign in or Create an Account**: If you haven't already, create a Spotify developer acccount using your existing Spotify credentials.

**3**. **Create an App**: Click the **Create an App** button and fill up the details

**4**. **Obtain Client ID and Redirect URI**: Once your app is created, navigate to the app's **Edit Settings** page. You'll find your Client ID and Redirect URI under the **App Credentials** section. Copy these values as you'll need them to configure Rhythm Recap.

## Environment Variable Setup
Rhythm Recap uses environment variables to securely store sensitive API credentials. Here's how to set them up:

1. Create an ``.env`` file (if it doesn't exist): In your project's root directory, create a file named ``.env``. Make sure it's not tracked by version control (e.g., add it to your ``.gitignore`` file).

2. Inside the ``.env`` file, add the following lines, replacing placeholders with your actual values:

```env
REACT_APP_CLIENT_ID=your_spotify_client_id
REACT_APP_REDIRECT_URI=your_spotify_redirect_uri
REACT_APP_SCOPES=user-top-read playlist-modify-public playlist-modify-private
REACT_APP_SPOTIFY_API_BASE_URL=https://api.spotify.com/v1/
REACT_APP_SPOTIFY_API_TOP_TRACKS_ENDPOINT=me/top/tracks
REACT_APP_SPOTIFY_API_TOP_ARTISTS_ENDPOINT=me/top/artists
REACT_APP_SPOTIFY_AUTH_URL="https://accounts.spotify.com/authorize?response_type=token&client_id=%s&scope=%s&redirect_uri=%s"
```

- ``REACT_APP_CLIENT_ID``: Your Spotify client ID obtained from the previous step.
- ``REACT_APP_REDIRECT_URI``: The redirect URI configured in your Spotify app settings.
- ``REACT_APP_SCOPES``: Set this to ``user-top-read`` to grant your app permission to access user's top tracks, ``playlist-modify-public playlist-modify-private`` grants your app permission to create a playlist either public or private (configurable in ``src/services/spotifyService.js``). You can find a full list of Spotify scopes on the Spotify for Developers website.
- ``REACT_APP_SPOTIFY_API_BASE_URL``: The base URL for Spotify's Web API.
- ``REACT_APP_SPOTIFY_API_TOP_TRACKS_ENDPOINT``: The endpoint to fetch a user's top tracks.
- ``REACT_APP_SPOTIFY_API_TOP_ARTISTS_ENDPOINT``: The endpoint to fetch a user's top artists.
- ``REACT_APP_SPOTIFY_AUTH_URL``: The value should be as shown in the example above, do not modify it at all.

### Additional Considerations
- **Security**: Never commit your ``.env`` file to a public repository, use secure environment variable handling methods in production.
- **Scopes**: Adjust ``REACT_APP_SCOPES`` appropriately based on the Spotify API endpoints you intend to access. Refer to the Spotify API documentation for more details.
- **Production Deployment**: When deploying Rhythm Recap to a production environment, update the ``REACT_APP_REDIRECT_URI`` with your production server's URL instead of **``http://localhost:3000``**.

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
**1**. Clone the repository:
```bash
   git clone https://github.com/dragonGR/RhythmRecap.git
   cd RhythmRecap
 ```
**2**. Install dependencies:
```bash
npm install
```
**3**. Set up enviroment variables:

Ensure that your ``.env`` file is properly set up and configured according to the instructions provided in the previous steps. This file should contain all necessary environment variables, correctly formatted and tailored to your project's specific needs.

**4**. Start the development server:

```bash
npm start
```

The app will be usually available at **``http://localhost:3000``**
