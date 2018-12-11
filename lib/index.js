// This file is in the entry point in your webpack config.
var api_key = process.env.MUSIXMATCH_API_KEY;

$(document).ready(function() {
  const song_url = "https://playbe.herokuapp.com/api/v1/favorites";
  fetch(song_url)
    .then(result => { return result.json(); })
    .then(songData => { buildFavorites(songData)})
    .catch(error => { console.error({error}); })
});

const fetchArtistData = () => {
  const artist = $('#artist-input').val();
  const url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${api_key}&q_artist=${artist}&format=json&page_size=50`;
  fetch(url, {mode: 'cors'})
    .then(result => { return result.json(); })
    .then(artistData => { buildArtistSongs(artistData)})
    .catch(error => { console.error({error}); });

  $('#artist-input').val('Find Artist');
}

const buildArtistSongs = (artistData) => {
  var tracks = artistData['message']['body']['track_list']
  tracks.forEach(track => {
    let track_id = track['track']['track_id'];
    let track_genre = track['track']['primary_genres'][0];
    let genre = assignGenre(track_genre)
    $('.artist-song-table').append(`
      <tr id='${track_id}'>
        <td class='artist_name'>${track['track']['artist_name']}</td>
        <td class='track_name'>${track['track']['track_name']}</td>
        <td class='album_name'>${track['track']['album_name']}</td>
        <td class='genre'>${genre}</td>
        <td class='release_date'>${track['track']['first_release_date']}</td>
        <td><button class='favorite_song' value='${track_id}'></button></td>
      </tr>
      `)
  });
}

const buildFavorites = (songData) => {
  var songs = songData
  songs.forEach(song => {
    let id = song['id'];
    let title = song['name'];
    let artist_name = song['artist_name'];
    let genre = song['genre'];
    let rating = song['song_rating'];

    $('.favorites-table').append(`
    <tr id='${song.id}'>
      <td class='song_artist'>${artist_name}</td>
      <td class='song_title'>${title}</td>
      <td class='genre'>${genre}</td>
      <td class='rating'>${rating}</td>
      <td class='add-button'><button id=${id}><i class='icon fa fa-plus'></i></button></td> 
    </tr>
    `)
  });
}

const assignGenre = (genre) => {
  if (genre === undefined) {
    return 'Misc'
  } else {
    return genre
  }
}

  $('#search-button').on('click', fetchArtistData);
  $('.artist-song-table').on('click', '.favorite_song', function() {
    var id = this.value
    var cells = $(`#${id}`)[0].cells // this grabs the row cells that belong to the corresponding button
    Array.prototype.forEach.call(cells, cell => {
      console.log(cell.innerText)
    });
  });
