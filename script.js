// all buttons
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
// array to store all the songs
let allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];
// All modern browsers support the Web Audio API,
// which lets you generate and process audio in web applications.
// let create HTML5 audio elem.
const audio = new Audio();
// Your music player should keep track of the songs, the current song playing, and the time of the current song.
// create empty obj
const userData = {
  songs: [...allSongs],
  // curr song info and track it's playback time.
  currentSong: null,
  songCurrentTime: 0,
};
// for playing the displayed songs.
const playSong = (id) => {
  // Find the first value as per condition
  const song = userData?.songs.find((song) => song.id === id);
  // tells the audio element where to find the audio data for the selected song.
  audio.src = song.src;
  // tells the audio element what to display as the title of the song
  audio.title = song.title;
  // make sure song starts from the beginning.
  // audio.currentTime make it happend
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    // to resume the current song at the point where it was paused.
    audio.currentTime = userData?.songCurrentTime;
  }
  // to update the current song being played 
  userData.currentSong = song;
  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play(); //  is a method from the web audio API for playing an mp3 file.
};
// pausing
const pauseSong = () => {
  // To store the current time of the song 
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  // pause audio
  audio.pause();
};
// play next song
const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id)
  } else {
    const currentSongIndex = getCurrentSongIndex();
    // retrieve the next song
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};
// play previous song
const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};
// to shuffle
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};
// delete functionality for the playlist
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }
  userData.songs = userData?.songs.filter((song) => song.id !== id)
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
};
// display song title and artist
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};
// highlight playing song in playlist
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
  // The forEach method is used to loop through an array and perform a function on each element of the array.
  playlistSongElements.forEach((songEl) => {
    // removeAttribute() - remove attribute
    songEl.removeAttribute("aria-current");
  });
  // set new attribute
  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};
// An arrow function is an anonymous function expression 
// and a shorter way to write functions. 
// To display the songs in the UI (User Interface),
// you'll need to create a function.
const renderSongs = (array) => {
  const songsHTML = array.map((song) => {
    return `
    <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
        <span class="playlist-song-title">${song.title}</span>
        <span class="playlist-song-artist">${song.artist}</span>
        <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aira-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
        </svg>
      </button>
    </li>
    `
  })
  .join("");
  // to update the playlist in your HTML document
  playlistSongs.innerHTML = songsHTML;
  if (userData?.songs.length === 0) {
    // createElement() to dynamically create an element using JS
    const resetButton = document.createElement("button");
    // createTextNode() add text
    const resetText = document.createTextNode("Reset Playlist");
    // js provide id and arial-label properties
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    // appendChild() - body>h1
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();

    });
  }
};
// the play button describes the current song 
// or the first song in the playlist.
const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");

};
// get index of each song
const getCurrentSongIndex = () => {
  // returns the first index at which a given element can be found
  return userData?.songs.indexOf(userData?.currentSong);
};
playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id)
  }
});
pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});
// to sort 
const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < a.title) {
      return -1; // no need to sort
    }
    if (a.title > b.title) {
      return 1; // sort b, a
    }
    return 0; // case a == b, no sort
  });
  return userData?.songs;
};
//  to finally display the songs in the UI.
// Optional chaining (?.) helps prevent errors 
// when accessing nested properties that might be null or undefined.
// renderSongs(userData?.songs)
renderSongs(sortSongs());
