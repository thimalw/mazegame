import Maze, { states as cellStates } from '../maze';
import Player from './player';

function Game(width, height, gameCanvas) {
    this.width = width;
    this.height = height;
    this.gameCanvas = gameCanvas;
    this.ctx = gameCanvas.getContext('2d');
    this.mazeGrid = null;
    this.player = null;
}

Game.prototype.start = function() {
    this.mazeGrid = new Maze(this.width, this.height, null);
    this.mazeGrid.createCells();
    this.mazeGrid.generateMaze();

    this.player = new Player();
    window.addEventListener('keydown', this.handleKeyDown.bind(this), false);

    window.requestAnimationFrame(this.update.bind(this));
}

Game.prototype.update = function() {
    let cellW = 30;
    let cellH = 30;
    let lineWidth = 4;

    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.width * (cellW + lineWidth), this.height * (cellH + lineWidth));

    for (let y = 0; y < this.mazeGrid.cells.length; y++) {
        for (let x = 0; x < this.mazeGrid.cells[y].length; x++) {
            let thisCell = this.mazeGrid.cells[y][x];

            if (!(thisCell.state & cellStates.right)) {
                // draw right wall
                this.ctx.beginPath();
                this.ctx.moveTo(cellW * x + cellW + lineWidth, cellH * y + lineWidth)
                this.ctx.lineTo(cellW * x + cellW + lineWidth, cellH * y + cellH + lineWidth);
                this.ctx.closePath();
                this.ctx.lineWidth = lineWidth;
                this.ctx.strokeStyle = "black";
                this.ctx.stroke();
            }
            if (!(thisCell.state & cellStates.bottom)) {
                // draw bottom wall
                this.ctx.beginPath();
                this.ctx.moveTo(cellW * x + cellW + lineWidth, cellH * y + cellH + lineWidth);
                this.ctx.lineTo(cellW * x + lineWidth, cellH * y + cellH + lineWidth);
                this.ctx.closePath();
                this.ctx.lineWidth = lineWidth;
                this.ctx.strokeStyle = "black";
                this.ctx.stroke();
            }

            if (this.player.x == x && this.player.y == y) {
                // draw player
                this.ctx.restore();
                this.ctx.beginPath();
                this.ctx.arc(cellW * x + (cellW / 2) + lineWidth, cellH * y + (cellH / 2) + lineWidth, (cellW - lineWidth)/2, 0, 2 * Math.PI);
                this.ctx.fillStyle = "red";
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

    // draw grid walls
    // left wall
    this.ctx.beginPath();
    this.ctx.moveTo(lineWidth, lineWidth);
    this.ctx.lineTo(lineWidth, cellH * this.mazeGrid.cells.length + lineWidth);
    // top wall
    this.ctx.moveTo(lineWidth, lineWidth);
    this.ctx.lineTo(cellW * this.mazeGrid.cells[0].length + lineWidth, lineWidth);
    this.ctx.closePath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();

    window.requestAnimationFrame(this.update.bind(this));
}

Game.prototype.handleKeyDown = function(e) {
    console.log(e.keyCode);

    switch (e.keyCode) {
        case 87: // up
            if (this.mazeGrid.cells[this.player.y][this.player.x].state & cellStates.top) {
                this.player.moveUp();
            }
            break;
        case 68: // right
            if (this.mazeGrid.cells[this.player.y][this.player.x].state & cellStates.right) {
                this.player.moveRight();
            }
            break;
        case 83: // down
            if (this.mazeGrid.cells[this.player.y][this.player.x].state & cellStates.bottom) {
                this.player.moveDown();
            }
            break;
        case 65: // left
            if (this.mazeGrid.cells[this.player.y][this.player.x].state & cellStates.left) {
                this.player.moveLeft();
            }
            break;
    }
}

export default Game;
