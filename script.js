const pads = document.querySelectorAll(".pad"); //8 buttons ki list
const volumeSlider = document.getElementById("volume");
const mute = document.getElementById("mute");

pads.forEach((pad) => {
  const soundName = pad.dataset.sound;
  const audio = new Audio(`sounds/${soundName}.mp3`);
  pad.audio = audio;
  // console.log(pad.audio)
});

let beingUsed = null;

pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    if (beingUsed != null) {
      beingUsed.pause();
    }
    beingUsed = pad.audio;
    pad.audio.currentTime = 0;
    pad.audio.volume = volumeSlider.value;
    pad.audio.play();
    pad.classList.add("playing");
    setTimeout(() => {
      pad.classList.remove("playing");
    }, 300);
  });
});

volumeSlider.addEventListener("input", () => {
  // pads.forEach((pad) => (pad.audio.volume = volumeSlider.value));
  if (beingUsed) {
    beingUsed.volume = volumeSlider.value;
  }
});

let isMuted = false;
mute.addEventListener("click", () => {
  if (beingUsed == null) return;
  isMuted = !isMuted;
  beingUsed.muted = isMuted;
  mute.textContent = isMuted ? " 🔇" : "🔊";
});

pads.forEach((pad) => {
  pad.audio.load();
});
