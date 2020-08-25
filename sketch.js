const sudoku = new Sudoku();
const selCell = { x: 0, y: 0 };

let cellSize;

function setup() {
    createCanvas(600, 600);
    textAlign(CENTER, CENTER);
    noLoop();
    cellSize = width / 9;
}

function mousePressed() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        selCell.x = floor(mouseX / cellSize);
        selCell.y = floor(mouseY / cellSize);
        redraw();
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        sudoku.solve();
    } else if (key === " ") {
        sudoku.reset();
    } else {
        const n = parseInt(key);
        if (!isNaN(n)) {
            sudoku.puzzle[selCell.x][selCell.y] = n;
        }
    }
    redraw();
}

function draw() {
    background(255);
    for (let i = 0; i < 10; i++) {
        strokeWeight(i % 3 ? 3 : 8);
        line(0, cellSize * i, width, cellSize * i);
        line(cellSize * i, 0, cellSize * i, height);
    }
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            textSize((x == selCell.x && y === selCell.y) ? 40 : 32);
            text(sudoku.puzzle[x][y] ? sudoku.puzzle[x][y] : "", (x + 0.5) * cellSize, (y + 0.5) * cellSize + 3);
        }
    }
    if (sudoku.puzzle[selCell.x][selCell.y] === 0) {
        text("|", (selCell.x + 0.5) * cellSize, (selCell.y + 0.5) * cellSize);
    }
}