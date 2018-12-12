

$(document).ready(function(){
  var urlParams = new URLSearchParams(window.location.search);
  var playlistId = urlParams.get('id');
  let playlistSongsUrl = `https://playbe.herokuapp.com/api/v1/playlists/${playlistId}/songs`;

  fetch(playlistSongsUrl)
    .then(result => { return result.json(); })
    .then(playlistSongs => { debugger; buildArtistSongs(playlistSongs[0]) })
    .catch(error => { console.log({error}) })
});

const buildArtistSongs = (playlistSongs) => {
  debugger;
  addTitle(playlistSongs)
  playlistSongs.songs.forEach(song => {
   $('.playlist-songs').append
    (`
      <tr>
        <td class='song_artist'>${song.artist_name}</td>
        <td class='song_title'>${song.name}</td>
        <td class='genre'>${song.genre}</td>
        <td class='rating'>${song.rating}</td>
      </tr>
    `)
  })
}

const addTitle = (playlistSongs) => {
  $('.playlist-songs-div').prepend
  (`
  <h1 id='playlist-songs-title'>${playlistSongs.name}</h1>
  `)
}