function toggleButton() {
  var sidebar = document.getElementById('sidebar');
  var content = document.getElementById('content');
  if (sidebar.classList.contains('sidebar-closed')) {
      sidebar.classList.remove('sidebar-closed');
      content.classList.remove('content-shift');
  } else {
      sidebar.classList.add('sidebar-closed');
      content.classList.add('content-shift');
  }
};

function playAudio() {
  var audio = document.getElementById('audio');
  audio.play();
  audio.addEventListener('timeupdate', updateProgress);
}

function pauseAudio() {
  var audio = document.getElementById("audio");
  audio.pause();
}

function controlSong() {
  var audio = document.getElementById('audio');
  var progressBar = document.getElementById('progressBar');
  audio.currentTime = progressBar.value;
}

function updateProgress() {
  var audio = document.getElementById('audio');
  var progressBar = document.getElementById('progressBar');
  if (!isNaN(audio.duration)) {
      progressBar.max = audio.duration;
      progressBar.value = audio.currentTime;
  }
}