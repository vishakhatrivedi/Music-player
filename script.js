console.log("Welcome to Spotify clone");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ukulele trip version", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Stomp Rap Adrenaline", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "In the forest", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "A sinister power", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "One last time", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Happy day", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Summer party", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tokyo cafe", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Motivational electric", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Instrument", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

// Function to initialize the song list
const initializeSongList = () => {
    songItems.forEach((element, i) => {
        const song = songs[i];
        element.getElementsByTagName("img")[0].src = song.coverPath;
        element.getElementsByClassName("songName")[0].innerText = song.songName;
        element.dataset.index = i; // Store the index as a data attribute
        element.addEventListener('click', (event) => {
            const clickedElement = event.currentTarget;
            const index = clickedElement.dataset.index;
            playSong(index);
        });
    });
};


// Function to play a song
const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Change the cover image
    const songCover = document.getElementById('songCover');
    songCover.src = songs[index].coverPath;
};

// Initialize the song list
initializeSongList();


// Play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex < songs.length - 1) {
        playSong(songIndex + 1);
    } else {
        // If it's the last song, loop back to the first song
        playSong(0);
    }
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex > 0) {
        playSong(songIndex - 1);
    } else {
        // If it's the first song, go to the last song
        playSong(songs.length - 1);
    }
});


const songCoverContainer = document.querySelector('.songCoverContainer');
const resizeHandle = document.getElementById('resizeHandle');

let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const initialWidth = parseFloat(getComputedStyle(songCoverContainer).width);
    const initialHeight = parseFloat(getComputedStyle(songCoverContainer).height);

    document.addEventListener('mousemove', resize);

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
    });

    function resize(e) {
        if (!isResizing) return;

        const newWidth = initialWidth + (e.clientX - startX);
        const newHeight = initialHeight + (e.clientY - startY);

        songCoverContainer.style.width = `${newWidth}px`;
        songCoverContainer.style.height = `${newHeight}px`;
    }
});