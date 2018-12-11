// This file is in the entry point in your webpack config.

var api_key = process.env.MUSIXMATCH_API_KEY

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

const assignGenre = (genre) => {
  if (genre === undefined) {
    return 'Misc'
  } else {
    return genre
  }
}

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
    var cells = $(`#${id}`)[0].cells; // this grabs the row cells that belong to the corresponding button
    var payload = new Object();
    Array.prototype.forEach.call(cells, cell => {
      if (valid_key.includes(cell.className)) {
        payload[cell.className] = cell.innerText;
      }
    });
    postSong(payload);
  });
