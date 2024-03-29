function customNumber(n) {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(n) ? Number(n) : -1;
}
let board = [];
function populateBoard() {
    board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const boardValue = document.getElementById(`${i}${j}`).value;
            const numVal = customNumber(boardValue);
            if (boardValue != '' && numVal == -1) {
                return false;
            }
            row.push(numVal);
        }
        board.push(row);
    }
    return true;
}
function gridIndex(i, j) {
    return ((Math.floor(i / 3)) * 3) + (Math.floor(j / 3));
}
function validateBoard() {
    if (board.length != 9 && board[0].length != 9) {
        return false;
    }
    const mapGrid = new Map(Array.from({ length: 9 }, (_, i) => [i, new Map()]));
    for (let i = 0; i < 9; i++) {
        const mapRow = new Map();
        const mapCol = new Map();
        for (let j = 0; j < 9; j++) {
            const rowVal = board[i][j];
            const colVal = board[j][i];
            if (mapRow.has(rowVal) || mapCol.has(colVal) || mapGrid.get(gridIndex(i, j)).has(rowVal)) {
                return false;
            }
            else {
                if (rowVal != -1) {
                    mapRow.set(rowVal, 1);
                    mapGrid.get(gridIndex(i, j)).set(rowVal, 1);
                }
                if (colVal != -1) {
                    mapCol.set(colVal, 1);
                }
            }
        }
    }
    return true;
}
function solve() {
    return populateBoard() && validateBoard();
}
let potentialValue = new Map();
function findPotentialValues() {
    const mapComplement = function (foundVals) {
        return Array.from({ length: 9 }, (_, i) => i).filter(i => (foundVals.get(i) === 1));
    };
    function innerJoinSet(arr1, arr2) {
        const inBoth = [];
        for (let i = 0; i < arr1.length; i++) {
            if (arr2.includes(arr1[i]) && !(inBoth.includes(arr1[i]))) {
                inBoth.push(arr1[i]);
            }
        }
        return inBoth;
    }
    if (board.length != 9 && board[0].length != 9) {
        return false;
    }
    for (let i = 0; i < 9; i++) {
        const rowPossibilities = new Map(Array.from({ length: 9 }, (_, i) => [i + 1, 1]));
        const rowUnknowns = [];
        const colPossibilities = new Map(Array.from({ length: 9 }, (_, i) => [i + 1, 1]));
        const colUnknowns = [];
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == -1) {
                rowUnknowns.push([i, j]);
            }
            else {
                rowPossibilities.set(board[i][j], 0);
            }
            if (board[j][i] == -1) {
                colUnknowns.push([j, i]);
            }
            else {
                colPossibilities.set(board[j][i], 0);
            }
        }
        for (let i = 0; i < rowUnknowns.length; i++) {
            if (potentialValue.get(JSON.stringify(rowUnknowns[i])) === undefined) {
                potentialValue.set(JSON.stringify(rowUnknowns[i]), mapComplement(rowPossibilities));
            }
            else {
                potentialValue.set(JSON.stringify(rowUnknowns[i]), innerJoinSet(potentialValue.get(JSON.stringify(rowUnknowns[i])), mapComplement(rowPossibilities)));
            }
        }
        for (let i = 0; i < colUnknowns.length; i++) {
            if (potentialValue.get(JSON.stringify(colUnknowns[i])) === undefined) {
                potentialValue.set(JSON.stringify(colUnknowns[i]), mapComplement(colPossibilities));
            }
            else {
                potentialValue.set(JSON.stringify(colUnknowns[i]), innerJoinSet(potentialValue.get(JSON.stringify(colUnknowns[i])), mapComplement(colPossibilities)));
            }
        }
    }
    //also do grids
    potentialValue = new Map([...potentialValue.entries()].sort());
}
//# sourceMappingURL=main.js.map