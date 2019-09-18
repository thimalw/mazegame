function Player() {
    this.x = 0;
    this.y = 0;
}

Player.prototype.moveUp = function() {
    this.y -= 1;
}

Player.prototype.moveRight = function() {
    this.x += 1;
}

Player.prototype.moveDown = function() {
    this.y += 1;
}

Player.prototype.moveLeft = function() {
    this.x -= 1;
}

export default Player;
