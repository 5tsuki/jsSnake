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
        theGuyPlaying.username = localStorage.getItem("lastPlayer");
    }

    $("#okStartGame").click(function () {
        theGuyPlaying.username = $("#username").val().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (theGuyPlaying.username == "") {
            alert("Username empty!");
        } else if (theGuyPlaying.username.length > 32) {
            alert("Username too long! (max. 32)");
        } else {
            localStorage.setItem("lastPlayer", theGuyPlaying.username);
            $("#displayUsername").text(localStorage.getItem("lastPlayer"));
            if (!gameLoaded) startGame();
            $("#JustStarted").fadeOut(500);
            $("#GameStarted").fadeIn(1000);
        }
    });

    $("#changeUsername").click(function () {
        localStorage.removeItem("lastPlayer");
        restartGame();
    });
});