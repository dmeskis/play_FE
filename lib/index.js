// This file is in the entry point in your webpack config.
import { MUSIXMATCH_API_KEY } from '../api'
require('dotenv').config(); //Loads the env file in the root unless in production

const url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${MUSIXMATCH_API_KEY}&q_track=We will rock you&format=json`
var trackData

fetch(url, {mode: 'cors'}).then(result => {
    return result.json();
  }).then(json => {
    trackData = json;
  }).catch(error =>{
      console.error({error});
    });

function fetchArtistData(artist) {

}

$('#search-button').on('click', fetchArtistData($('#artist-input').val())
