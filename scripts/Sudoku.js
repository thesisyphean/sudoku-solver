class Sudoku {
    constructor() {
        this.puzzle = [...Array(9)].map(e => Array(9).fill(0));
    }

    solve() {
        if (this.isValid()) {
            return this.backtrack();
        }
        alert("This is not a valid sudoku puzzle.");
    }

    isValid() {
        const seen = new Set();
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                const n = this.puzzle[x][y];
                if (n !== 0) {
                    if (seen.has(`${n}r${y}`) || seen.has(`${n}c${x}`) || seen.has(`${n}s${floor(x / 3)}-${floor(y / 3)}`)) {
                        return false;
                    }
                    seen.add(`${n}r${y}`);
                    seen.add(`${n}c${x}`);
                    seen.add(`${n}s${floor(x / 3)}-${floor(y / 3)}`);
                }
            }
        }
        return true;
    }

    backtrack() {
        const { v, x, y } = this.findEmpty();
        if (!v) {
            return true;
        }
        for (let n = 1; n < 10; n++) {
            if (this.isValidPlace(n, x, y)) {
                this.puzzle[x][y] = n;
                if (this.backtrack()) {
                    return true;
                }
                this.puzzle[x][y] = 0;
            }
        }
        return false;
    }

    findEmpty() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.puzzle[x][y] === 0) {
                    return { v: true, x: x, y: y };
                }
            }
        }
        return { v: false };
    }

    isValidPlace(n, col, row) {
        const subgridX = floor(col / 3) * 3;
        const subgridY = floor(row / 3) * 3;
        for (let i = 0; i < 9; i++) {
            if (this.puzzle[i][row] === n || this.puzzle[col][i] === n || this.puzzle[subgridX + floor(i / 3)][subgridY + i % 3] === n) {
                return false;
            }
        }
        return true;
    }

    reset() {
        this.puzzle.forEach(e => e.fill(0));
    }
}
