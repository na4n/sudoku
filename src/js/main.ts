
function customNumber(n: string): number{
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(n) ? Number(n) : -1;
}

let board: number[][] = [];
function populateBoard(): boolean{
    board = [];
    for(let i = 0; i < 9; i++){
        const row: number[] = []
        for(let j = 0; j < 9; j++){
            const boardValue: string = (<HTMLInputElement>document.getElementById(`${i}${j}`)).value;
            const numVal = customNumber(boardValue);
            if(boardValue != '' && numVal == -1){
                return false;
            }
            row.push(numVal);
        }
        board.push(row);
    }

    return true;
}

function gridIndex(i: number, j: number): number{
    return ((Math.floor(i/3))*3)+(Math.floor(j/3))+1;
}

let mapGrid: Map<number, Map<number, number>>;
let mapRow: Map<number, Map<number, number>>;
let mapCol: Map<number, Map<number, number>>;
function validateBoard(): boolean {
    if(board.length != 9 && board[0].length != 9){
        return false;
    }
    mapGrid = new Map(Array.from({length: 9}, (_, i) => [i + 1, new Map(Array.from({length: 9}, (_, j) => [j + 1, 0]))]));
    mapRow = new Map(Array.from({length: 9}, (_, i) => [i + 1, new Map(Array.from({length: 9}, (_, j) => [j + 1, 0]))]));
    mapCol = new Map(Array.from({length: 9}, (_, i) => [i + 1, new Map(Array.from({length: 9}, (_, j) => [j + 1, 0]))]));

    for(let i = 0; i < 9; i++){
        const singleMapRow: Map<number, number> = new Map(Array.from({length: 9}, (_, i) => [i + 1, 0]));
        const singleMapCol: Map<number, number> = new Map(Array.from({length: 9}, (_, i) => [i + 1, 0]));
        for(let j = 0; j < 9; j++){
            const rowVal: number = board[i][j];
            const colVal: number = board[j][i];
            if(singleMapRow.get(rowVal) == 1 || singleMapCol.get(colVal) == 1 || mapGrid.get(gridIndex(i, j)).get(rowVal) == 1){
                return false;
            }
            else{
                if(rowVal != -1){
                    singleMapRow.set(rowVal, 1);
                    mapGrid.get(gridIndex(i, j)).set(rowVal, 1);
                }
                if(colVal != -1){
                    singleMapCol.set(colVal, 1);
                }
            }
        }
        mapRow.set(i, singleMapRow);
        mapCol.set(i, singleMapCol);
    }

    return true;
}

function solve(): boolean{
    const boardValid = populateBoard() && validateBoard();
    if(boardValid){
        findVals();
    }

    return boardValid;
}

let potentialValues: Map<string, number[]> = new Map();
function findVals(){
    function logAndMapValues(row: Map<number, number>, col: Map<number, number>, grid: Map<number, number>){
        const sharedVals = [];
        for(let i = 1; i <= 9; i++){
            if(row.get(i) == 0 && col.get(i) == 0 && grid.get(i) == 0){
                sharedVals.push(i);
            }
        }
        return sharedVals;
    }
   
    potentialValues = new Map();

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] === -1){
                const row = mapRow.get(i);
                const col = mapCol.get(j);
                const grid = mapGrid.get(gridIndex(i,j));
                
                potentialValues.set(JSON.stringify([i, j]), logAndMapValues(row, col, grid));
            } 
        }
    }

    potentialValues = new Map([...potentialValues.entries()].sort((a, b) => a[0].localeCompare(b[0])));

    return;
}

function checkMap(): boolean{
    let change: boolean = false;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(potentialValues.has(JSON.stringify([i, j])) && potentialValues.get(JSON.stringify([i, j])).length == 1){
                change = true;
                const value = potentialValues.get(JSON.stringify([i, j]))[0];
                const div = <HTMLInputElement>(document.getElementById(`${i}${j}`));
                
                div.value = String(value);
                board[i][j] = value;
                
                mapRow.get(i).set(value, 1);
                mapCol.get(j).set(value, 1);
                mapGrid.get(gridIndex(i, j)).set(value, 1);

                div.style.color = 'red';
            }
        }
    }

    return change;
}

function solveDeterministic() {
    while(checkMap()){
        findVals();
    }
}

function backtrack(){

}
