var playerUsername;
var gameLoaded = false;

$(document).ready(function () {
    $("#displayUsername").text(localStorage.getItem("lastPlayer"));
    $("#GameStarted").hide();
    $("#JustStarted").hide();

    if (localStorage.getItem("lastPlayer") == null) {
        $("#JustStarted").fadeIn(500);
    } else {
        startGame();
        gameLoaded = true;
        $("#GameStarted").fadeIn(1000);
        playerUsername = localStorage.getItem("lastPlayer");
        theGuyPlaying.username = playerUsername;
    }
    
    $("#okStartGame").click(function () {
        playerUsername = $("#username").val().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (playerUsername == "") {
            alert("Username vuoto!");
        } else if (playerUsername.length > 32) {
            alert("Username troppo lungo! (max. 32)");
        } else {
            theGuyPlaying.username = playerUsername;
            localStorage.setItem("lastPlayer", playerUsername);
            $("#displayUsername").text(localStorage.getItem("lastPlayer"));
            if (!gameLoaded) startGame();
            $("#JustStarted").fadeOut(500);
            $("#GameStarted").fadeIn(1000);
        }
    });

    $("#changeUsername").click(function(){
        localStorage.removeItem("lastPlayer");
        restartGame();
    });
});