var isPlaying = true; // Controlla se la canzone è in riproduzione

// QUESTO È UN EASTER EGG!!!!!!!!!!!
var easterEgg = {
    cont: 0,
    flag: false
};

document.getElementById("musicControls").volume = 0.1; // Inizializza il volume della canzone a 10%

// Controlli Volume
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

// Pausa / Riproduci
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

    // QUESTO È UN EASTER EGG!!!!!!!!!!!
    if (easterEgg.cont == 10 && !easterEgg.flag) {
        alert("You found the easter egg!");
        document.getElementById("musicControls").src = "sounds/easteregg.mp3"
        easterEgg.flag = true;
    }
}