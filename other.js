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
  var audio = document.getElementById("audio");
  audio.play();
}

function pauseAudio() {
  var audio = document.getElementById("audio");
  audio.pause();
}