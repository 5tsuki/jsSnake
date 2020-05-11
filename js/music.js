var isPlaying = true;
var easterEgg = {
    cont: 0,
    flag: false
};

document.getElementById("musicControls").volume = 0.1;

function higherVolume() {
    try {
        document.getElementById("musicControls").volume += 0.1;
    } catch (e) {}
}

function lowerVolume() {
    try {
        document.getElementById("musicControls").volume -= 0.1;
    } catch (e) {}
}

function toggleMusic() {
    if (isPlaying) {
        document.getElementById("musicControls").pause();
        document.getElementById("playButton").classList.add("fa-play");
        document.getElementById("playButton").classList.remove("fa-pause");
    } else {
        document.getElementById("musicControls").play();
        document.getElementById("playButton").classList.remove("fa-play");
        document.getElementById("playButton").classList.add("fa-pause");
        easterEgg.cont++;
    }
    isPlaying = !isPlaying;

    if (easterEgg.cont == 10 && !easterEgg.flag) {
        alert("You found the easter egg!");
        document.getElementById("musicControls").src = "sounds/easteregg.mp3"
        easterEgg.flag = true;
    }
}