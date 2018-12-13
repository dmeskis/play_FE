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
/***/ (function(module, exports) {

	'use strict';

	$(document).ready(function () {
	  var urlParams = new URLSearchParams(window.location.search);
	  var playlistId = urlParams.get('id');
	  var playlistSongsUrl = 'https://playbe.herokuapp.com/api/v1/playlists/' + playlistId + '/songs';

	  fetch(playlistSongsUrl).then(function (result) {
	    return result.json();
	  }).then(function (playlistSongs) {
	    buildArtistSongs(playlistSongs[0]);
	  }).catch(function (error) {
	    console.log({ error: error });
	  });
	});

	var buildArtistSongs = function buildArtistSongs(playlistSongs) {
	  addTitle(playlistSongs);
	  playlistSongs.songs.forEach(function (song) {
	    $('.playlist-songs').append('\n      <tr>\n        <td class=\'song_artist\'>' + song.artist_name + '</td>\n        <td class=\'song_title\'>' + song.name + '</td>\n        <td class=\'genre\'>' + song.genre + '</td>\n        <td class=\'rating\'>' + song.rating + '</td>\n      </tr>\n    ');
	  });
	};

	var addTitle = function addTitle(playlistSongs) {
	  $('.playlist-songs-div').prepend('\n  <h1 id=\'playlist-songs-title\'>' + playlistSongs.name + '</h1>\n  ');
	};

/***/ })
/******/ ]);