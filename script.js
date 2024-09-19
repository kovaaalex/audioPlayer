const forback = document.querySelectorAll('#previous__next')
const playPause = document.querySelector('.play__pause')
const progressBar = document.querySelector('#progress-bar')
const currentTimeElem = document.querySelector('.current__time')
const durationTimeElem = document.querySelector('.duration__time')
const artistElem = document.querySelector('#song .artist')
const titleElem = document.querySelector('#song .title')
const audio = new Audio()
let isPlay = false
let current = 'beyonce'
const tracks = {
    'beyonce': {
        title: "Don't Hurt Yourself",
        artist: "Beyoncé",
        duration: "3:53",
        maxDuration: 233.717551,
        audioSrc: 'assets/audio/beyonce.mp3',
        imgSrc: 'assets/img/beyonce.png'
    },
    'dontstartnow': {
        title: "Don't Start Now",
        artist: "Dua Lipa",
        duration: "3:23",
        maxDuration: 203.717551,
        audioSrc: 'assets/audio/dontstartnow.mp3',
        imgSrc: 'assets/img/dontstartnow.png'
    }
}

const trackOrder = ['beyonce', 'dontstartnow']

function playNextTrack() {
    let currentIndex = trackOrder.indexOf(current)
    let nextIndex = (currentIndex + 1) % trackOrder.length
    show(trackOrder[nextIndex])
}
forback.forEach(btn => btn.addEventListener('click', () => {
    document.body.classList[0] === 'beyonce' ? show('dontstartnow') : show('beyonce')
}))
function show(name) {
    current = name
    const track = tracks[name]
    document.querySelector('.background').src = track.imgSrc
    document.querySelector('.player__music').src = track.imgSrc
    document.body.className = ''
    document.body.classList.add(name)
    durationTimeElem.innerHTML = track.duration
    progressBar.max = track.maxDuration
    artistElem.innerHTML = track.artist
    titleElem.innerHTML = track.title
    playAudio(track.audioSrc)
}
playPause.addEventListener('click', () => {
    playPause.src = isPlay ? 'assets/svg/play.png' : 'assets/svg/pause.png'
    isPlay = !isPlay
    if (isPlay) playAudio(tracks[current].audioSrc)
    else pauseAudio()
})
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime
    updateCurrentTime()
})
function updateCurrentTime() {
    const minutes = Math.floor(audio.currentTime / 60)
    const seconds = Math.floor(audio.currentTime % 60)
    currentTimeElem.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
function playAudio(auSrc) {
    audio.src = auSrc
    audio.play()
    isPlay = true
    playPause.src = 'assets/svg/pause.png'
}
function pauseAudio() {
    audio.pause()
    isPlay = false
    playPause.src = 'assets/svg/play.png'
}
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value
    updateCurrentTime()
})
audio.addEventListener('ended', playNextTrack)