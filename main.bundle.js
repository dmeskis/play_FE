/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// This file is in the entry point in your webpack config.

	var api_key = ("229d1f0db4db72de996641e7a806b813");

	$(document).ready(function () {
	  var song_url = "https://playbe.herokuapp.com/api/v1/favorites";
	  var playlist_url = "https://playbe.herokuapp.com/api/v1/playlists";

	  fetch(song_url).then(function (result) {
	    return result.json();
	  }).then(function (songData) {
	    buildFavorites(songData);
	  }).catch(function (error) {
	    console.error({ error: error });
	  });

	  fetch(playlist_url).then(function (result) {
	    return result.json();
	  }).then(function (playlistData) {
	    buildPlaylists(playlistData);
	  }).catch(function (error) {
	    console.error({ error: error });
	  });
	});

	var fetchArtistData = function fetchArtistData() {
	  var artist = $('#artist-input').val();
	  var url = "https://api.musixmatch.com/ws/1.1/track.search?apikey=" + api_key + "&q_artist=" + artist + "&format=json&page_size=50";

	  fetch(url, { mode: 'cors' }).then(function (result) {
	    return result.json();
	  }).then(function (artistData) {
	    buildArtistSongs(artistData);
	  }).catch(function (error) {
	    console.error({ error: error });
	  });

	  $('#artist-input').val('Find Artist');
	};

	var buildArtistSongs = function buildArtistSongs(artistData) {
	  var tracks = artistData['message']['body']['track_list'];
	  tracks.forEach(function (track) {
	    var track_id = track['track']['track_id'];
	    var track_genre = track['track']['primary_genres'][0];
	    var genre = assignGenre(track_genre);
	    $('.artist-song-table').append("\n      <tr id='" + track_id + "'>\n        <td class='artist_name'>" + track['track']['artist_name'] + "</td>\n        <td class='name'>" + track['track']['track_name'] + "</td>\n        <td class='album_name'>" + track['track']['album_name'] + "</td>\n        <td class='genre'>" + genre + "</td>\n        <td class='release_date'>" + track['track']['first_release_date'] + "</td>\n        <td class='song_rating'>" + track['track']['track_rating'] + "</td>\n        <td><button class='favorite_song' value='" + track_id + "'></button></td>\n      </tr>\n      ");
	  });
	};

	var buildFavorites = function buildFavorites(songData) {
	  var songs = songData;
	  songs.forEach(function (song) {
	    var id = song['id'];
	    var title = song['name'];
	    var artist_name = song['artist_name'];
	    var genre = song['genre'];
	    var rating = song['song_rating'];

	    $('.favorites-table').append("\n    <tr id='song-" + song.id + "'>\n      <td class='song_artist'>" + artist_name + "</td>\n      <td class='song_title'>" + title + "</td>\n      <td class='genre'>" + genre + "</td>\n      <td class='rating'>" + rating + "</td>\n      <td class='add-button'><button id=" + id + "><i class='icon fa fa-plus'></i></button></td>\n    </tr>\n    ");
	  });
	};

	var buildPlaylists = function buildPlaylists(playlistData) {
	  var playlists = playlistData;
	  playlists.forEach(function (playlist) {
	    var id = playlist['id'];
	    var name = playlist['name'];

	    $('.playlists-table').append("\n    <tr id=playlist-" + id + ">\n      <td class='playlist-name'><a href='./playlist.html?id=" + id + "&name=" + name + "'>" + name + "</a></td>\n    </tr>\n    ");
	  });
	};

	var assignGenre = function assignGenre(genre) {
	  if (genre === undefined) {
	    return 'Misc';
	  } else {
	    return genre;
	  }
	};

	var postSong = function postSong(payload) {
	  var url = 'https://playbe.herokuapp.com/api/v1/songs';
	  return fetch(url, {
	    method: "POST",
	    mode: "cors",
	    headers: {
	      "Content-Type": "application/json; charset=utf-8"
	    },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return response.json();
	  });
	};

	$('#search-button').on('click', fetchArtistData);
	$('.artist-song-table').on('click', '.favorite_song', function () {
	  var valid_key = ['name', 'artist_name', 'genre', 'song_rating'];
	  var id = this.value;
	  var cells = $("#song-" + id)[0].cells; // this grabs the row cells that belong to the corresponding button
	  var payload = new Object();
	  Array.prototype.forEach.call(cells, function (cell) {
	    if (valid_key.includes(cell.className)) {
	      payload[cell.className] = cell.innerText;
	    }
	  });
	  postSong(payload);
	});

/***/ })
/******/ ]);