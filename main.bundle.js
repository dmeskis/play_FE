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

	'use strict';

	// This file is in the entry point in your webpack config.

	var api_key = ("229d1f0db4db72de996641e7a806b813");

	var fetchArtistData = function fetchArtistData() {
	  var artist = $('#artist-input').val();
	  var url = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=' + api_key + '&q_artist=' + artist + '&format=json&page_size=50';

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
	    $('.artist-song-table').append('\n      <tr id=\'' + track_id + '\'>\n        <td class=\'artist_name\'>' + track['track']['artist_name'] + '</td>\n        <td class=\'track_name\'>' + track['track']['track_name'] + '</td>\n        <td class=\'album_name\'>' + track['track']['album_name'] + '</td>\n        <td class=\'genre\'>' + genre + '</td>\n        <td class=\'release_date\'>' + track['track']['first_release_date'] + '</td>\n        <td><button class=\'favorite_song\' value=\'' + track_id + '\'></button></td>\n      </tr>\n      ');
	  });
	};

	// track['track']['primary_genres']["music_genre_list"][0]

	var assignGenre = function assignGenre(genre) {
	  if (genre === undefined) {
	    return 'Misc';
	  } else {
	    return genre;
	  }
	};

	$('#search-button').on('click', fetchArtistData);
	$('.artist-song-table').on('click', '.favorite_song', function () {
	  var id = this.value;
	  var cells = $('#' + id)[0].cells; // this grabs the row cells that belong to the corresponding button
	  Array.prototype.forEach.call(cells, function (cell) {
	    console.log(cell.innerText);
	  });
	});

/***/ })
/******/ ]);