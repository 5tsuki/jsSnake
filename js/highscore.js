var Data = fetch('https://api.ipify.org?format=json').then(response => response.json()).then(data => Data = data.ip);

function saveScore() {
    if (!cheatsFound()) {
        if (theGuyPlaying.score >= 10) {
            db.collection("scores").doc().set({
                    name: theGuyPlaying.username,
                    score: theGuyPlaying.score,
                    data: Data
                })
                .then(function () {
                    console.log("Score submitted!");
                    updateScores();
                })
                .catch(function (error) {
                    console.error("Error: ", error);
                });
        }
    } else {
        clearInterval(myGameArea.interval);
        myGameArea.clear();
        var canvas = document.getElementById("gameCanvas");
        var cntx = canvas.getContext("2d");
        cntx.font = "150px Pixeboy";
        cntx.textBaseline = "middle";
        cntx.textAlign = "center";
        cntx.fillStyle = "#7f7f7f";
        cntx.fillText("YOU CHEATED", w / 2 + 5, h / 2 - 50);
        cntx.fillStyle = "#ffffff";
        cntx.fillText("YOU CHEATED", w / 2, h / 2 - 5 - 50);

        console.error("bruh, cheater soyboy");
    }

}

function cheatsFound() {
    if (!componentCheat()) {
        if (!snakeCheat()) {
            if (!pointsCheat()) {
                return false;
            }
        }
    }

    isAlive = false;
    return true;
}

function pointsCheat() {
    if (theGuyPlaying.score / 10 != myGamePiece.length - 3) {
        console.error("Points Cheat!");
        return true;
    }
    return false;
}

function snakeCheat() {
    var flag = false;

    for (var i = 1; i < myGamePiece.length - 1; i++) {
        for (var j = i + 1; j < myGamePiece.length; j++) {
            if (myGamePiece[i].equals(myGamePiece[j])) {
                flag = true;
                console.error("Snake Cheat!");
                break;
            }
        }

        if (flag == true) {
            break;
        }
    }

    return flag;
}

function componentCheat() {
    var flag = false;

    for (var i = 0; i < myGamePiece.length; i++) {
        if ((myGamePiece[i].width != 25 || myGamePiece[i].height != 25) || (myGamePiece[i].x % 25 != 0 || myGamePiece[i].y % 25 != 0)) {
            flag = true;
            console.error("Component Cheat!");
            break;
        }
    }

    return flag;
}

function updateScores() {
    i = 1;
    document.getElementById('scoreboard').innerHTML = '<tr><td><i class="fas fa-trophy"></i></td><td>Name</td><td>Score</td></tr>';
    db.collection("scores").orderBy("score", "desc").limit(20).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            $("#scoreboard").append('<tr>' +
                '<td>' + i + '</td>' +
                '<td>' + doc.data().name + '</td>' +
                '<td>' + doc.data().score + '</td>' +
                '</tr>'
            );
            i++;
        });
    });
}