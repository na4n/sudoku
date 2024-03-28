
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
    return ((Math.floor(i/3))*3)+(Math.floor(j/3));
}

function validateBoard(): boolean {
    if(board.length != 9){
        return false;
    }

    const mapGrid: Map<number,Map<number, number>> = new Map(Array.from({length:9}, (_,i) => [i, new Map()]));
    for(let i = 0; i < 9; i++){
        const mapRow: Map<number, number> = new Map();
        const mapCol: Map<number, number> = new Map();
        for(let j = 0; j < 9; j++){
            const rowVal: number = board[i][j];
            const colVal: number = board[j][i];
            if(mapRow.has(rowVal) || mapCol.has(colVal) || mapGrid.get(gridIndex(i, j)).has(rowVal)){
                return false;
            }
            else{
                if(rowVal != -1){
                    mapRow.set(rowVal, 1);
                    mapGrid.get(gridIndex(i, j)).set(rowVal, 1);
                }
                if(colVal != -1){
                    mapCol.set(colVal, 1);
                }
            }
        }
    }

    return true;
}

function solve(): boolean{
    return populateBoard() && validateBoard();
}

const potentialValue: Map<string, number[]> = new Map();
function findPotentialValues() {
    for (let i = 0; i < 9; i++) {
        const arr: string[] = [];
        let hashmap: Map<number, number> = new Map(Array.from({ length: 9 }, (_, i) => [i + 1, 1]));
        for (let j = 0; j < 9; j++) {
            const rowEle: HTMLElement = document.getElementById(`${i}${j}`);
            if ((<HTMLInputElement>(rowEle)).value === '') {
                arr.push(`${i}${j}`);
            }
            else {
                hashmap.set(Number((<HTMLInputElement>(rowEle)).value), 0);
            }
        }
        const values: number[] = [];
        for (let i = 1; i < 10; i++) {
            if (hashmap.get(i) === 1) {
                values.push(i);
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (potentialValue.get(arr[i]) === undefined) {
                potentialValue.set(arr[i], values);
            }
            else {
                potentialValue.set(arr[i], potentialValue.get(arr[i]).concat(values));
            }
        }

    }

    for (let j = 0; j < 9; j++) {
        const arr: string[] = [];
        let hashmap: Map<number, number> = new Map(Array.from({ length: 9 }, (_, i) => [i + 1, 1]));
        for (let i = 0; i < 9; i++) {
            const rowEle = document.getElementById(`${i}${j}`);
            if ((<HTMLInputElement>rowEle).value === '') {
                arr.push(`${i}${j}`);
            }
            else {
                hashmap.set(Number((<HTMLInputElement>rowEle).value), 0)
            }
        }
        const values: number[] = [];
        for (let i = 1; i < 10; i++) {
            if (hashmap.get(i) === 1) {
                values.push(i);
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (potentialValue.get(arr[i]) === undefined) {
                potentialValue.set(arr[i], values);
            }
            else {
                potentialValue.set(arr[i], Array.from(new Set(potentialValue.get(arr[i]).concat(values))));
            }
        }

    }
}

