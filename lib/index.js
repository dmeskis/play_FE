// This file is in the entry point in your webpack config.
import { MUSIXMATCH_API_KEY } from '../api'
require('dotenv').config(); //Loads the env file in the root unless in production

const fetchArtistData = () => {
  const artist = $('#artist-input').val()
  const url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${MUSIXMATCH_API_KEY}&q_artist=${artist}&format=json&page_size=50`

  fetch(url, {mode: 'cors'})
    .then(result => { return result.json(); })
    .then(artistData => { buildArtistSongs(artistData)})
    .catch(error => { console.error({error}); });

  $('#artist-input').val('Find Artist');
}

const buildArtistSongs = (artistData) => {
  var tracks = artistData['message']['body']['track_list']
  debugger;
}

$('#search-button').on('click', fetchArtistData)
