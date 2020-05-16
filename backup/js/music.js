var isPlaying = true; // Controlla se la canzone è in riproduzione

// QUESTO È UN EASTER EGG!!!!!!!!!!!
var easterEgg = {
    cont: 0,
    flag: false
};

if (localStorage.getItem("musicVolume") == null) {
    document.getElementById("musicControls").volume = 0.05; // Inizializza il volume della canzone a 5%
    saveVolume(); 
} else {
    document.getElementById("musicControls").volume = localStorage.getItem("musicVolume");
}

// Controlli Volume
function higherVolume() {
    try {
        document.getElementById("musicControls").volume += 0.05;
        saveVolume();
    } catch (e) {}
}

function lowerVolume() {
    try {
        document.getElementById("musicControls").volume -= 0.05;
        saveVolume();
    } catch (e) {}
}

function saveVolume(){
    localStorage.setItem("musicVolume", document.getElementById("musicControls").volume);
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