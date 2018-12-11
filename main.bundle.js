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

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	// This file is in the entry point in your webpack config.
	var api_key = process.env.MUSIXMATCH_API_KEY;

	$(document).ready(function () {
	  var url = "https://playbe.herokuapp.com/api/v1/favorites";
	  fetch(url).then(function (result) {
	    return result.json();
	  }).then(function (songData) {
	    buildFavorites(songData);
	  }).catch(function (error) {
	    console.error({ error: error });
	  });
	});

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

	var buildFavorites = function buildFavorites(songData) {
	  var songs = songData;
	  songs.forEach(function (song) {
	    var id = song['id'];
	    var title = song['name'];
	    var artist_name = song['artist_name'];
	    var genre = song['genre'];
	    var rating = song['song_rating'];

	    $('.favorites-table').append('\n    <tr id=\'' + song.id + '\'>\n      <td class=\'song_artist\'>' + artist_name + '</td>\n      <td class=\'song_title\'>' + title + '</td>\n      <td class=\'genre\'>' + genre + '</td>\n      <td class=\'rating\'>' + rating + '</td>\n      <td class=\'add-button\'><button id=' + id + '><i class=\'icon fa fa-plus\'></i></button></td> \n    </tr>\n    ');
	  });
	};

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ })
/******/ ]);