// This file is in the entry point in your webpack config.
// const dotenv = require("dotenv");
// const { error } = dotenv.config();
// if (error) {
//   throw error
// }
require('dotenv').config();

var MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;
console.log(MUSIXMATCH_API_KEY)

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
  tracks.forEach(track => {
    $('.artist-song-table').append(`
      <tr>
        <td>${track['track']['artist_name']}</td>
        <td>${track['track']['track_name']}</td>
        <td>${track['track']['album_name']}</td>
        <td>Genre goes here</td>
        <td>${track['track']['first_release_date']}</td>
        <td>BUTTON GOES HERE</td>
      </tr>
      `)
  });
}

$('#search-button').on('click', fetchArtistData)
