var Data = fetch('https://api.ipify.org?format=json').then(response => response.json()).then(data => Data = data.ip);

// Funzione per salvare il punteggio all'interno del database
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
        // Output nel caso il giocatore avesse provato a cheattare
        endGame("YOU CHEATED", "#ffffff", "#7f7f7f", false);
        console.error("bruh, cheater soyboy");
    }

}

function cheatsFound() {
    // Controlla se il giocatore ha provato a cheattare
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

// Aggiorna i punteggi sulla Scoreboard
function updateScores() {
    let i = 1; // Posizione
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

// Vari controlli per i cheat
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