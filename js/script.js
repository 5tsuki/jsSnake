// Dimensione canvas
const w = 800;
const h = 600;

var time = 0; // Contatore per l'aggiornamento del canvas
const refreshRate = 20; // FPS: 50

var tmp;        // Oggetto temporaneo     
var newFruit;   // Frutto

var snakeDirection = "right";   // Direzione del Serpente

// Flags
var gameStarted = false;    // Controlla se il player ha iniziato la partita
var isAlive = true;         // Controlla se il player è ancora vivo
var victoryFlag = false;    // Controlla se il player ha vinto la partita
var isPaused = false;       // Controlla se il gioco è in pausa

// Giocatore e Area di gioco
var myGamePiece = new Array();
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        // Inizializzazione Canvas
        this.canvas.setAttribute("id", "gameCanvas")
        this.canvas.width = w;
        this.canvas.height = h;
        this.context = this.canvas.getContext("2d");
        document.getElementById("DisplayGame").appendChild(this.canvas);

        // Tempo Update Canvas
        this.interval = setInterval(updateGameArea, 1);

        // Event Listener degli input della tastiera
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        // Pulizia Canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function checkDirection() {
    // Controlla e cambia la direzione del serpente (evita movimenti impossibili)
    if ((myGamePiece[0].speedY == 25) && (myGamePiece[0].lastSpeedY == -25)) {
        myGamePiece[0].speedY = -25;
    } else if ((myGamePiece[0].speedY == -25) && (myGamePiece[0].lastSpeedY == 25)) {
        myGamePiece[0].speedY = 25;
    }

    if ((myGamePiece[0].speedX == 25) && (myGamePiece[0].lastSpeedX == -25)) {
        myGamePiece.speedX = -25;
    } else if ((myGamePiece[0].speedX == -25) && (myGamePiece[0].lastSpeedX == 25)) {
        myGamePiece[0].speedX = 25;
    }
}

function startGame() {
    // Avvia il gioco
    updateScores();     // Aggiorna la scoreboard
    myGameArea.start();

    // Inizializzazione serpente
    myGamePiece.push(new component(25, 25, "#ccc", 50, 0));
    myGamePiece.push(new component(25, 25, "white", 25, 0));
    myGamePiece.push(new component(25, 25, "white", 0, 0));
    generateFruit(); // Generazione primo frutto
}

function generateFruit() {
    // Genera il frutto
    var clipped = true; 

    while (clipped == true) {
        clipped = false;

        newFruit = new component(25, 25, generateColor(), randomPosition(w), randomPosition(h));

        // Controlla se il frutto si è generato all'interno del serpente
        for (var i = 0; i < myGamePiece.length; i++) {
            if (newFruit.x == myGamePiece[i].x && newFruit.y == myGamePiece[i].y) {
                clipped = true;
                break;
            }
        }
    }
}

function randomPosition(dim) {
    // Serve per generare le coordinate del frutto
    let temp = Math.floor((Math.random() * dim / 25));

    return temp * 25;
}

function checkIfClipped() {
    // Controlla se il serpente collide contro al muro
    if (myGamePiece[0].x < 0) {
        myGamePiece[0].x = 0;
        isAlive = false;
    } else if (myGamePiece[0].x > myGameArea.canvas.width - myGamePiece[0].width) {
        myGamePiece[0].x = myGameArea.canvas.width - myGamePiece[0].width;
        isAlive = false;
    }

    if (myGamePiece[0].y < 0) {
        myGamePiece[0].y = 0;
        isAlive = false;
    } else if (myGamePiece[0].y > myGameArea.canvas.height - myGamePiece[0].height) {
        myGamePiece[0].y = myGameArea.canvas.height - myGamePiece[0].height;
        isAlive = false;
    }

    // Controlla se il serpente collide contro se stesso
    if (myGamePiece.length > 4) {
        for (var i = 4; i < myGamePiece.length; i++) {
            if (myGamePiece[0].x == myGamePiece[i].x && myGamePiece[0].y == myGamePiece[i].y) {
                isAlive = false;
                break;
            }
        }
    }
}

function changePoints() {
    // Modifica il punteggio
    theGuyPlaying.score += 10;
}

function generateColor() {
    // Genera il colore per il frutto
    let fruitColors = ["red", "blue", "green", "yellow", "orange", "purple"];
    return fruitColors[Math.floor(Math.random() * fruitColors.length)];
}

function checkCollision() {
    // Controlla se il serpente ha mangiato il frutto
    if (myGamePiece[0].x == newFruit.x && myGamePiece[0].y == newFruit.y) {
        tmp = myGamePiece[myGamePiece.length - 1];
        if (tmp.lastSpeedX == 25) {
            myGamePiece.push(new component(tmp.width, tmp.height, "white", (tmp.x - 25), tmp.y));
        } else if (tmp.lastSpeedX == -25) {
            myGamePiece.push(new component(tmp.width, tmp.height, "white", (tmp.x + 25), tmp.y));
        } else if (tmp.lastSpeedY == 25) {
            myGamePiece.push(new component(tmp.width, tmp.height, "white", tmp.x, (tmp.y - 25)));
        } else if (tmp.lastSpeedY == -25) {
            myGamePiece.push(new component(tmp.width, tmp.height, "white", tmp.x, (tmp.y + 25)));
        }
        myGamePiece[myGamePiece.length - 1].update();
        playSound("sounds/eating.wav");
        changePoints();
        checkVictory();
        generateFruit();
    }
}

function playSound(srcUrl) {
    // Riproduce il suono passato per parametro
    let gameSound = new Audio(srcUrl);
    gameSound.volume = 1;
    gameSound.play();
}

function updateGameArea() {
    // Main loop del gioco 
    if (!victoryFlag) {
        if (isAlive) {
            // Se il giocatore non ha vinto ed è ancora vivo

            // Key Codes
            if (snakeDirection != "right" && (myGameArea.key && myGameArea.key == 37)) {
                myGamePiece[0].speedX = -myGamePiece[0].width;
                myGamePiece[0].speedY = 0;
                gameStarted = true;
            } // Sinistra

            if (snakeDirection != "left" && (myGameArea.key && myGameArea.key == 39)) {
                myGamePiece[0].speedX = myGamePiece[0].width;
                myGamePiece[0].speedY = 0;
                gameStarted = true;
            } // Destra

            if (snakeDirection != "down" && (myGameArea.key && myGameArea.key == 38)) {
                myGamePiece[0].speedY = -myGamePiece[0].height;
                myGamePiece[0].speedX = 0;
                gameStarted = true;
            } // Su

            if (snakeDirection != "up" && (myGameArea.key && myGameArea.key == 40)) {
                myGamePiece[0].speedY = myGamePiece[0].height;
                myGamePiece[0].speedX = 0;
                gameStarted = true;
            } // Giù

            time++;

            // Aggiornamento grafico del canvas
            if (time == refreshRate) {
                myGameArea.clear();
                messageUpdate(theGuyPlaying.score);

                switch (myGamePiece[0].speedX) {
                    case 25:
                        snakeDirection = "right";
                        break;
                    case -25:
                        snakeDirection = "left";
                        break;
                }
                switch (myGamePiece[0].speedY) {
                    case 25:
                        snakeDirection = "down";
                        break;
                    case -25:
                        snakeDirection = "up";
                        break;
                }

                // Meccanica di spostamento del serpente
                for (var i = myGamePiece.length - 1; i >= 0; i--) {
                    if (i != 0) {
                        myGamePiece[i].newPos(myGamePiece[i - 1]);
                    } else {
                        myGamePiece[i].newPos(null);
                    }
                    myGamePiece[i].update();
                }
                
                checkCollision();
                checkIfClipped();
                newFruit.update();
                time = 0;
            }
        } else {
            // Il giocatore ha perso
            playSound("sounds/dead.wav");
            endGame("YOU LOST", "#ff0000", "#ffa500", true);
            saveScore();
        }
    } else {
        // Il giocatore ha vinto
        endGame("YOU WON", "#00fa9a", "#009225", true);
        saveScore();
    }
}

function pause() {
    // Mette in pausa il gioco
    if (isAlive && !victoryFlag) {
        if (isPaused == false) {
            clearInterval(myGameArea.interval);
            isPaused = true;

            myGameArea.clear();

            messageUpdate("PAUSE");
            newFruit.update();

            for (var i = 0; i < myGamePiece.length; i++) {
                myGamePiece[i].update();
            }
        } else {
            myGameArea.interval = setInterval(updateGameArea, 1);
            isPaused = false;

            myGameArea.clear();

            messageUpdate("PAUSE");
            newFruit.update();

            for (var i = 0; i < myGamePiece.length; i++) {
                myGamePiece[i].update();
            }
        }
    }
}

function messageUpdate(message) {
    // Stampa il testo sullo sfondo
    var canvas = document.getElementById("gameCanvas");
    var cntx = canvas.getContext("2d");
    cntx.textBaseline = "middle";
    cntx.textAlign = "center";
    cntx.font = "200px Pixeboy";
    cntx.fillStyle = 'rgba(255, 255, 255, .2)';
    cntx.fillText(message, w / 2, h / 2 - 50);
}

function checkVictory() {
    // Controlla se il giocatore ha vinto
    if (theGuyPlaying.score == (((w / 25) * (h / 25)) * 10 - 30)) {
        victoryFlag = true;
    }
}

function endGame(message, frontTextColor, backTextColor, showPoints) {
    // Messaggio di fine partita
    clearInterval(myGameArea.interval);
    myGameArea.clear();
    var canvas = document.getElementById("gameCanvas");
    var cntx = canvas.getContext("2d");
    cntx.font = "150px Pixeboy";
    cntx.textBaseline = "middle";
    cntx.textAlign = "center";
    cntx.fillStyle = backTextColor;
    cntx.fillText(message, w / 2 + 5, h / 2 - 75);
    cntx.fillStyle = frontTextColor;
    cntx.fillText(message, w / 2, h / 2 - 5 - 75);
    if (showPoints) {
        cntx.font = "75px Pixeboy";
        cntx.fillStyle = "white";
        cntx.fillText(("YOU SCORED: " + theGuyPlaying.score), w / 2, h / 2 + 75);
    }
}

function restartGame() {
    // Ricarica la pagina per resettare il gioco
    window.location.reload();
}