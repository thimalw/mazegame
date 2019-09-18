/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/index.js":
/*!***************************!*\
  !*** ./src/game/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _maze__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../maze */ \"./src/maze/index.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/game/player.js\");\n\n\n\nfunction Game(width, height, gameCanvas) {\n    this.width = width;\n    this.height = height;\n    this.gameCanvas = gameCanvas;\n    this.ctx = gameCanvas.getContext('2d');\n    this.mazeGrid = null;\n    this.player = null;\n}\n\nGame.prototype.start = function() {\n    this.mazeGrid = new _maze__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.width, this.height, null);\n    this.mazeGrid.createCells();\n    this.mazeGrid.generateMaze();\n\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    window.addEventListener('keydown', this.handleKeyDown.bind(this), false);\n\n    window.requestAnimationFrame(this.update.bind(this));\n}\n\nGame.prototype.update = function() {\n    let cellW = 30;\n    let cellH = 30;\n    let lineWidth = 4;\n\n    this.ctx.restore();\n    this.ctx.clearRect(0, 0, this.width * (cellW + lineWidth), this.height * (cellH + lineWidth));\n\n    for (let y = 0; y < this.mazeGrid.cells.length; y++) {\n        for (let x = 0; x < this.mazeGrid.cells[y].length; x++) {\n            let thisCell = this.mazeGrid.cells[y][x];\n\n            if (!(thisCell.state & _maze__WEBPACK_IMPORTED_MODULE_0__[\"states\"].right)) {\n                // draw right wall\n                this.ctx.beginPath();\n                this.ctx.moveTo(cellW * x + cellW + lineWidth, cellH * y + lineWidth)\n                this.ctx.lineTo(cellW * x + cellW + lineWidth, cellH * y + cellH + lineWidth);\n                this.ctx.closePath();\n                this.ctx.lineWidth = lineWidth;\n                this.ctx.strokeStyle = \"black\";\n                this.ctx.stroke();\n            }\n            if (!(thisCell.state & _maze__WEBPACK_IMPORTED_MODULE_0__[\"states\"].bottom)) {\n                // draw bottom wall\n                this.ctx.beginPath();\n                this.ctx.moveTo(cellW * x + cellW + lineWidth, cellH * y + cellH + lineWidth);\n                this.ctx.lineTo(cellW * x + lineWidth, cellH * y + cellH + lineWidth);\n                this.ctx.closePath();\n                this.ctx.lineWidth = lineWidth;\n                this.ctx.strokeStyle = \"black\";\n                this.ctx.stroke();\n            }\n\n            if (this.player.x == x && this.player.y == y) {\n                // draw player\n                this.ctx.restore();\n                this.ctx.beginPath();\n                this.ctx.arc(cellW * x + (cellW / 2) + lineWidth, cellH * y + (cellH / 2) + lineWidth, (cellW - lineWidth)/2, 0, 2 * Math.PI);\n                this.ctx.fillStyle = \"red\";\n                this.ctx.fill();\n                this.ctx.closePath();\n            }\n        }\n    }\n\n    // draw grid walls\n    // left wall\n    this.ctx.beginPath();\n    this.ctx.moveTo(lineWidth, lineWidth);\n    this.ctx.lineTo(lineWidth, cellH * this.mazeGrid.cells.length + lineWidth);\n    // top wall\n    this.ctx.moveTo(lineWidth, lineWidth);\n    this.ctx.lineTo(cellW * this.mazeGrid.cells[0].length + lineWidth, lineWidth);\n    this.ctx.closePath();\n    this.ctx.lineWidth = lineWidth;\n    this.ctx.strokeStyle = \"black\";\n    this.ctx.stroke();\n\n    window.requestAnimationFrame(this.update.bind(this));\n}\n\nGame.prototype.handleKeyDown = function(e) {\n    switch (e.keyCode) {\n        case 87: // up\n            if (this.mazeGrid.cells[this.player.y][this.player.x].state & _maze__WEBPACK_IMPORTED_MODULE_0__[\"states\"].top) {\n                this.player.moveUp();\n            }\n            break;\n        case 68: // right\n            if (this.mazeGrid.cells[this.player.y][this.player.x].state & _maze__WEBPACK_IMPORTED_MODULE_0__[\"states\"].right) {\n                this.player.moveRight();\n            }\n            break;\n        case 83: // down\n            if (this.mazeGrid.cells[this.player.y][this.player.x].state & _maze__WEBPACK_IMPORTED_MODULE_0__[\"states\"].bottom) {\n                this.player.moveDown();\n            }\n            break;\n        case 65: // left\n            if (this.mazeGrid.cells[this.player.y][this.player.x].state & _maze__WEBPACK_IMPORTED_MODULE_0__[\"states\"].left) {\n                this.player.moveLeft();\n            }\n            break;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game/index.js?");

/***/ }),

/***/ "./src/game/player.js":
/*!****************************!*\
  !*** ./src/game/player.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Player() {\n    this.x = 0;\n    this.y = 0;\n}\n\nPlayer.prototype.moveUp = function() {\n    this.y -= 1;\n}\n\nPlayer.prototype.moveRight = function() {\n    this.x += 1;\n}\n\nPlayer.prototype.moveDown = function() {\n    this.y += 1;\n}\n\nPlayer.prototype.moveLeft = function() {\n    this.x -= 1;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n\n//# sourceURL=webpack:///./src/game/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game/index.js\");\n\n\nlet gameCanvas = document.getElementById('gameCanvas');\nlet mazeGame = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](20, 20, gameCanvas);\nmazeGame.start();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/maze/cell.js":
/*!**************************!*\
  !*** ./src/maze/cell.js ***!
  \**************************/
/*! exports provided: default, states */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"states\", function() { return states; });\nfunction Cell(id, state) {\n    this.id = id;\n    this.state = state;\n}\n\nlet states = {\n    none: 0,\n    top: 1,\n    right: 2,\n    bottom: 4,\n    left: 8,\n    visited: 16\n};\n\nCell.prototype.createCellEl = function() {\n    let mazeCellEl = document.createElement('div');\n    mazeCellEl.setAttribute('id', this.id);\n    mazeCellEl.classList.add('maze-cell');\n\n    if (this.state & states.right) {\n        mazeCellEl.classList.add('maze-cell-path-right');\n    }\n    if (this.state & states.bottom) {\n        mazeCellEl.classList.add('maze-cell-path-bottom');\n    }\n\n    return mazeCellEl;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cell);\n\n\n\n//# sourceURL=webpack:///./src/maze/cell.js?");

/***/ }),

/***/ "./src/maze/index.js":
/*!***************************!*\
  !*** ./src/maze/index.js ***!
  \***************************/
/*! exports provided: default, states */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell */ \"./src/maze/cell.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"states\", function() { return _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"]; });\n\n\n\nfunction Maze(width, height, mazeEl) {\n    this.mazeEl = mazeEl;\n    this.width = width;\n    this.height = height;\n    this.cells = [];\n}\n\nMaze.prototype.createCells = function() {\n    for (let y = 0; y < this.height; y++) {\n        this.cells[y] = [];\n        for (let x = 0; x < this.width; x++) {\n            let newCell = new _cell__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`cell-${y}-${x}`, _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].none);\n            this.cells[y][x] = newCell;\n        }\n    }\n}\n\nMaze.prototype.generateMaze = function() {\n    let pathStack = [];\n    pathStack.push({ x: 0, y: 0 });\n    this.cells[pathStack[0].y][pathStack[0].x].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited;\n    let visitedCells = 1;\n\n    while (visitedCells < this.height * this.width) {\n        let pathTop = pathStack[pathStack.length - 1];\n        let cellNeighbours = [];\n\n        // top neighbour\n        if (pathTop.y > 0 && !(this.cells[pathTop.y - 1][pathTop.x].state & _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited)) {\n            cellNeighbours.push(0);\n        }\n        // right neighbour\n        if (pathTop.x < this.width - 1 && !(this.cells[pathTop.y][pathTop.x + 1].state & _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited)) {\n            cellNeighbours.push(1);\n        }\n        // bottom neighbour\n        if (pathTop.y < this.height - 1 && !(this.cells[pathTop.y + 1][pathTop.x].state & _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited)) {\n            cellNeighbours.push(2);\n        }\n        // left neighbour\n        if (pathTop.x > 0 && !(this.cells[pathTop.y][pathTop.x - 1].state & _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited)) {\n            cellNeighbours.push(3);\n        }\n\n        // if neighbours available\n        if (cellNeighbours.length > 0) {\n            let nextCellDir = cellNeighbours[Math.floor(Math.random() * cellNeighbours.length)];\n\n            switch (nextCellDir) {\n                case 0: // top\n                    this.cells[pathTop.y - 1][pathTop.x].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited | _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].bottom;\n                    this.cells[pathTop.y][pathTop.x].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].top;\n                    pathStack.push({x: pathTop.x, y: pathTop.y - 1});\n                    break;\n\n                case 1: // right\n                    this.cells[pathTop.y][pathTop.x + 1].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited | _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].left;\n                    this.cells[pathTop.y][pathTop.x].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].right;\n                    pathStack.push({x: pathTop.x + 1, y: pathTop.y});\n                    break;\n\n                case 2: // bottom\n                    this.cells[pathTop.y + 1][pathTop.x].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited | _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].top;\n                    this.cells[pathTop.y][pathTop.x].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].bottom;\n                    pathStack.push({x: pathTop.x, y: pathTop.y + 1});\n                    break;\n\n                case 3: // left\n                    this.cells[pathTop.y][pathTop.x - 1].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].visited | _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].right;\n                    this.cells[pathTop.y][pathTop.x].state |= _cell__WEBPACK_IMPORTED_MODULE_0__[\"states\"].left;\n                    pathStack.push({x: pathTop.x - 1, y: pathTop.y});\n                    break;\n            }\n\n            visitedCells++;\n        } else {\n            // backtrack\n            pathStack.pop();\n        }\n    }\n}\n\nMaze.prototype.createGridEl = function() {\n    for (let y = 0; y < this.cells.length; y++) {\n        let mazeRowEl = document.createElement('div');\n        mazeRowEl.setAttribute('id', `maze-row-${y}`);\n        mazeRowEl.classList.add('maze-row');\n\n        for (let x = 0; x < this.cells[y].length; x++) {\n            mazeRowEl.appendChild(this.cells[y][x].createCellEl());\n        }\n\n        this.mazeEl.appendChild(mazeRowEl);\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Maze);\n\n\n\n//# sourceURL=webpack:///./src/maze/index.js?");

/***/ })

/******/ });