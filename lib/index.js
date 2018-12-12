// This file is in the entry point in your webpack config.

var api_key = process.env.MUSIXMATCH_API_KEY;
var plData;

$(document).ready(function() {
  const song_url = "https://playbe.herokuapp.com/api/v1/favorites";
  const playlist_url = "https://playbe.herokuapp.com/api/v1/playlists";

  fetch(song_url)
    .then(result => { return result.json(); })
    .then(songData => { buildFavorites(songData)})
    .catch(error => { console.error({error}); })

  fetch(playlist_url)
    .then(result => { return result.json(); })
    .then(playlistData => {
      plData = playlistData;
      buildPlaylists(plData);
     })
    .catch(error => { console.error({error})} )
});

const fetchArtistData = () => {
  const artist = $('#artist-input').val()
  const url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${api_key}&q_artist=${artist}&format=json&page_size=50`

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
        <td class='name'>${track['track']['track_name']}</td>
        <td class='album_name'>${track['track']['album_name']}</td>
        <td class='genre'>${genre}</td>
        <td class='release_date'>${track['track']['first_release_date']}</td>
        <td class='song_rating'>${track['track']['track_rating']}</td>
        <td><button class='favorite_song' value='${track_id}'></button></td>
      </tr>
      `)
  });
}

const buildFavorites = (songData) => {
  var songs = songData;
  songs.forEach(song => {
    let id = song['id'];
    let title = song['name'];
    let artist_name = song['artist_name'];
    let genre = song['genre'];
    let rating = song['song_rating'];

    $('.favorites-table').append(`
    <tr id='song-${song.id}'>
      <td class='song_artist'>${artist_name}</td>
      <td class='song_title'>${title}</td>
      <td class='genre'>${genre}</td>
      <td class='rating'>${rating}</td>
      <td class='add-button'><button class='add-to-playlist' id=${id}><i class='icon fa fa-plus'></i></button></td>
    </tr>
    `)
  });
}

const buildPlaylists = (playlistData) => {
  var playlists = playlistData;
  playlists.forEach(playlist => {
    let id = playlist['id'];
    let name = playlist['name'];

    $('.playlists-table').append(`
    <tr id=playlist-${id}>
      <td class='playlist-name'><a href='./playlist.html?id=${id}&name=${name}'>${name}</a></td>
    </tr>
    `)
  })
}

const assignGenre = (genre) => {
  if (genre === undefined) {
    return 'Misc'
  } else {
    return genre
  }
}

const alertSaveSuccess = (body) => {
  var message = body['message'];
  $('body').prepend(`
    <div class='alert'>
    <span>${message}</span>
    </div>
    `)
    setTimeout(function(){
      $('.alert').remove()
    }, 2000);
};

const postSong = (payload) => {
  var url = 'https://playbe.herokuapp.com/api/v1/songs'
  return fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json());
}

  $('#search-button').on('click', fetchArtistData);
  $('.artist-song-table').on('click', '.favorite_song', function() {
    var valid_key = ['name', 'artist_name', 'genre', 'song_rating'];
    var id = this.value;
    var cells = $(`#song-${id}`)[0].cells; // this grabs the row cells that belong to the corresponding button
    var payload = new Object();
    Array.prototype.forEach.call(cells, cell => {
      if (valid_key.includes(cell.className)) {
        payload[cell.className] = cell.innerText;
      }
    });
    postSong(payload);
  });

$('.favorites-table').on('click', '.add-to-playlist', function() {
  console.log('it works dumass');
  var song_id = this.id
  $('#playlistModal').attr('value', `${song_id}`).css("display", "block");
  plData.forEach(playlist => {
    var id = playlist['id'];
    var name = playlist['name'];
    $('.add-to-playlists-table').append(`
    <tr>
      <td>${name}</td>
      <td><button class='add-to-playlist' id=${id}><i class='icon fa fa-plus'></i></button></td>
    </tr>
    `)
  });
});

$('#playlistModal').on('click', '.close', function() {
  $('.add-to-playlists-table').empty();
  $('.add-to-playlists-table').append(`
                                      <tr>
                                        <th>Name</th>
                                        <th>Add to this playlist</th>
                                      </tr>
                                      `);
  $('#playlistModal').css("display", "none");
});

$('.add-to-playlists-table').on('click', '.add-to-playlist', function() {
    var parent_element = this.parentElement.parentElement.parentElement.parentElement.parentElement
    var playlist_id = this.id
    var song_id = parent_element.attributes.value.value;
    var addUrl = `https://playbe.herokuapp.com/api/v1/playlists/${playlist_id}/songs/${song_id}`
    fetch(addUrl, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
    .then(response => response.json())
    .then(body => alertSaveSuccess(body));

  $('#playlistModal').css("display", "none");
  $('.add-to-playlists-table').empty();
  $('.add-to-playlists-table').append(`
                                      <tr>
                                        <th>Name</th>
                                        <th>Add to this playlist</th>
                                      </tr>
                                      `);
  $('#playlistModal').css("display", "none");
})
