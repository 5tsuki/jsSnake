function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.lastSpeedX = 0;
    this.lastSpeedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function (dest) {
        if (gameStarted == true) {
            if (dest != null) {
                this.x = dest.x;
                this.y = dest.y;
                this.lastSpeedX = dest.lastSpeedX;
                this.lastSpeedY = dest.lastSpeedY;
            } else {
                checkDirection();
                this.x += this.speedX;
                this.y += this.speedY;
                this.lastSpeedX = this.speedX;
                this.lastSpeedY = this.speedY;
            }
        }
    }
}