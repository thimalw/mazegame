import Game from './game';

let gameCanvas = document.getElementById('gameCanvas');
let mazeGame = new Game(20, 20, gameCanvas);
mazeGame.start();
