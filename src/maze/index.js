import Cell, { states } from './cell';

function Maze(width, height, mazeEl) {
    this.mazeEl = mazeEl;
    this.width = width;
    this.height = height;
    this.cells = [];
}

Maze.prototype.createCells = function() {
    for (let y = 0; y < this.height; y++) {
        this.cells[y] = [];
        for (let x = 0; x < this.width; x++) {
            let newCell = new Cell(`cell-${y}-${x}`, states.none);
            this.cells[y][x] = newCell;
        }
    }
}

Maze.prototype.generateMaze = function() {
    let pathStack = [];
    pathStack.push({ x: 0, y: 0 });
    this.cells[pathStack[0].y][pathStack[0].x].state |= states.visited;
    let visitedCells = 1;

    while (visitedCells < this.height * this.width) {
        let pathTop = pathStack[pathStack.length - 1];
        let cellNeighbours = [];

        // top neighbour
        if (pathTop.y > 0 && !(this.cells[pathTop.y - 1][pathTop.x].state & states.visited)) {
            cellNeighbours.push(0);
        }
        // right neighbour
        if (pathTop.x < this.width - 1 && !(this.cells[pathTop.y][pathTop.x + 1].state & states.visited)) {
            cellNeighbours.push(1);
        }
        // bottom neighbour
        if (pathTop.y < this.height - 1 && !(this.cells[pathTop.y + 1][pathTop.x].state & states.visited)) {
            cellNeighbours.push(2);
        }
        // left neighbour
        if (pathTop.x > 0 && !(this.cells[pathTop.y][pathTop.x - 1].state & states.visited)) {
            cellNeighbours.push(3);
        }

        // if neighbours available
        if (cellNeighbours.length > 0) {
            let nextCellDir = cellNeighbours[Math.floor(Math.random() * cellNeighbours.length)];

            switch (nextCellDir) {
                case 0: // top
                    this.cells[pathTop.y - 1][pathTop.x].state |= states.visited | states.bottom;
                    this.cells[pathTop.y][pathTop.x].state |= states.top;
                    pathStack.push({x: pathTop.x, y: pathTop.y - 1});
                    break;

                case 1: // right
                    this.cells[pathTop.y][pathTop.x + 1].state |= states.visited | states.left;
                    this.cells[pathTop.y][pathTop.x].state |= states.right;
                    pathStack.push({x: pathTop.x + 1, y: pathTop.y});
                    break;

                case 2: // bottom
                    this.cells[pathTop.y + 1][pathTop.x].state |= states.visited | states.top;
                    this.cells[pathTop.y][pathTop.x].state |= states.bottom;
                    pathStack.push({x: pathTop.x, y: pathTop.y + 1});
                    break;

                case 3: // left
                    this.cells[pathTop.y][pathTop.x - 1].state |= states.visited | states.right;
                    this.cells[pathTop.y][pathTop.x].state |= states.left;
                    pathStack.push({x: pathTop.x - 1, y: pathTop.y});
                    break;
            }

            visitedCells++;
        } else {
            // backtrack
            pathStack.pop();
        }
    }
}

Maze.prototype.createGridEl = function() {
    for (let y = 0; y < this.cells.length; y++) {
        let mazeRowEl = document.createElement('div');
        mazeRowEl.setAttribute('id', `maze-row-${y}`);
        mazeRowEl.classList.add('maze-row');

        for (let x = 0; x < this.cells[y].length; x++) {
            mazeRowEl.appendChild(this.cells[y][x].createCellEl());
        }

        this.mazeEl.appendChild(mazeRowEl);
    }
}

export default Maze;
export {
    states
}
