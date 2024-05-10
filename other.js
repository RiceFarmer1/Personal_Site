function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

function playAudio() {
  var audio = document.getElementById("audio");
  audio.play();
}
function pauseAudio() {
  var audio = document.getElementById("audio");
  audio.pause();
}