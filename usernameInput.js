var playerUsername;

$(document).ready(function () {
    $("#GameStarted").hide();
    $("#okStartGame").click(function () {
        playerUsername = $("#username").val().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (playerUsername == "") {
            alert("Username vuoto!");
        } else if (playerUsername.length > 32) {
            alert("Username troppo lungo! (max. 32)");
        } else {
            theGuyPlaying.username = playerUsername;
            startGame();
            $("#JustStarted").slideUp(350);
            $("#GameStarted").show();
        }
    });
});