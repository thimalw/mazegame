function Cell(id, state) {
    this.id = id;
    this.state = state;
}

let states = {
    none: 0,
    top: 1,
    right: 2,
    bottom: 4,
    left: 8,
    visited: 16
};

Cell.prototype.createCellEl = function() {
    let mazeCellEl = document.createElement('div');
    mazeCellEl.setAttribute('id', this.id);
    mazeCellEl.classList.add('maze-cell');

    if (this.state & states.right) {
        mazeCellEl.classList.add('maze-cell-path-right');
    }
    if (this.state & states.bottom) {
        mazeCellEl.classList.add('maze-cell-path-bottom');
    }

    return mazeCellEl;
}

export default Cell;
export {
    states
}
