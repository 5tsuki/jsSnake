// Dimensione canvas
var w = 800;
var h = 600;

var time = 0;

// Punteggio
var currentScore = 0;

var tmp;
var newFruit;

var snakeDirection = "right";

// Flags
var gameStarted = false;
var isAlive = true;

// Giocatore e Area di gioco
var myGamePiece = new Array();
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.setAttribute("id", "gameCanvas")
        this.canvas.width = w;
        this.canvas.height = h;
        this.context = this.canvas.getContext("2d");
        document.getElementById("DisplayGame").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 1);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function checkDirection(){
    if ((myGamePiece[0].speedY == 25) && (myGamePiece[0].lastSpeedY == -25) ){
        myGamePiece[0].speedY = -25;
    }
    else if ((myGamePiece[0].speedY == -25) && (myGamePiece[0].lastSpeedY == 25)) {
        myGamePiece[0].speedY = 25;
    }

    if ((myGamePiece[0].speedX == 25) && (myGamePiece[0].lastSpeedX == -25)) {
        myGamePiece.speedX = -25;
    } else if ((myGamePiece[0].speedX == -25) && (myGamePiece[0].lastSpeedX == 25)) {
        myGamePiece[0].speedX = 25;
    }
}

function startGame() {
    updateScores();
    myGameArea.start();
    myGamePiece.push(new component(25, 25, "#ccc", 50, 0));
    myGamePiece.push(new component(25, 25, "white", 25, 0));
    myGamePiece.push(new component(25, 25, "white", 0, 0));
    generateFruit();
}

function generateFruit() {
    var clipped = true;

    while (clipped == true) {
        clipped = false;

        newFruit = new component(25, 25, "red", randomPosition(w), randomPosition(h));

        for (var i = 0; i < myGamePiece.length; i++) {
            if (newFruit.x == myGamePiece[i].x && newFruit.y == myGamePiece[i].y) {
                clipped = true;
                break;
            }
        }
    }
}

function randomPosition(dim) {
    var tmp = Math.floor((Math.random() * dim));

    while (tmp % 25 != 0) {
        tmp = Math.floor((Math.random() * dim));
    }
    
    return tmp;
}

function checkIfClipped() {
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

    if (myGamePiece.length > 4) {
        for (var i = 4; i < myGamePiece.length; i++) {
            if (myGamePiece[0].x == myGamePiece[i].x && myGamePiece[0].y == myGamePiece[i].y) {
              isAlive = false;
              break;
            }
        }
    }
}

function changePoints(){
    currentScore += 10;
    theGuyPlaying.score = currentScore;
}

function checkCollision() {
    if (myGamePiece[0].x == newFruit.x && myGamePiece[0].y == newFruit.y) {
        tmp = myGamePiece[myGamePiece.length - 1];
        if (tmp.lastSpeedX == 25) {
          myGamePiece.push(new component(tmp.width, tmp.height, "white", (tmp.x - 25), tmp.y));
        }
        else if (tmp.lastSpeedX == -25) {
          myGamePiece.push(new component(tmp.width, tmp.height, "white", (tmp.x + 25), tmp.y));
        }
        else if (tmp.lastSpeedY == 25) {
          myGamePiece.push(new component(tmp.width, tmp.height, "white", tmp.x, (tmp.y - 25)));
        }
        else if (tmp.lastSpeedY == -25) {
          myGamePiece.push(new component(tmp.width, tmp.height, "white", tmp.x, (tmp.y + 25)));
        }
        myGamePiece[myGamePiece.length - 1].update();
        generateFruit();
        changePoints();
        return true;
    }
    else {
        return false;
    }
}

function updateGameArea() {
    if (isAlive){
        if (/*myGameArea.key && myGameArea.key == 37*/ snakeDirection != "right" && (myGameArea.key && myGameArea.key == 37)) {
            myGamePiece[0].speedX = -myGamePiece[0].width;
            myGamePiece[0].speedY = 0;
            gameStarted = true;
        } // Sinistra

        if (/*myGameArea.key && myGameArea.key == 39*/ snakeDirection != "left" && (myGameArea.key && myGameArea.key == 39)) {
            myGamePiece[0].speedX = myGamePiece[0].width;
            myGamePiece[0].speedY = 0;
            gameStarted = true;
        } // Destra

        if (/*myGameArea.key && myGameArea.key == 38*/ snakeDirection != "down" && (myGameArea.key && myGameArea.key == 38)) {
            myGamePiece[0].speedY = -myGamePiece[0].height;
            myGamePiece[0].speedX = 0;
            gameStarted = true;
        } // Su

        if (/*myGameArea.key && myGameArea.key == 40*/ snakeDirection != "up" && (myGameArea.key && myGameArea.key == 40)) {
            myGamePiece[0].speedY = myGamePiece[0].height;
            myGamePiece[0].speedX = 0;
            gameStarted = true;
        } // Giù

        time++;

        if (time == 20) {
            myGameArea.clear();
            pointsUpdate();

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

            for (var i = myGamePiece.length - 1; i >= 0; i--) {
                if (i != 0) {
                    myGamePiece[i].newPos(myGamePiece[i - 1]);
                }
                else {
                    myGamePiece[i].newPos(null);
                }
                myGamePiece[i].update();
            }
            checkCollision();
            checkIfClipped();
            newFruit.update();
            time = 0;
        }
    }
    else {
        clearInterval(myGameArea.interval);
        endGame();
    }
}

function pointsUpdate() {
    var canvas = document.getElementById("gameCanvas");
    var cntx = canvas.getContext("2d");
    cntx.textBaseline = "middle";
    cntx.textAlign = "center";
    cntx.font = "200px Pixeboy";
    cntx.fillStyle = 'rgba(255, 255, 255, .2)';
    cntx.fillText(currentScore, w/2, 250);
}

function endGame(){
    myGameArea.clear();
    var canvas = document.getElementById("gameCanvas");
    var cntx = canvas.getContext("2d");
    cntx.font = "150px Pixeboy";
    cntx.textBaseline = "bottom";
    cntx.textAlign = "left";
    cntx.fillStyle = "orange";
    cntx.fillText("YOU LOST", 155, 325);
    cntx.fillStyle = "red";
    cntx.fillText("YOU LOST", 150, 320);
    cntx.textBaseline = "middle";
    cntx.textAlign = "center";
    cntx.font = "75px Pixeboy";
    cntx.fillStyle = "white";
    cntx.fillText(("YOU SCORED: " + currentScore), w / 2, 350);
    saveScore();
}
