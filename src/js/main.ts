function validateBoard(): boolean {
    function customNumber(n: string): number{
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(n) ? Number(n) : -1;
    }    

    const gridmap: Map<number, Map<number, number>> = new Map(Array.from({ length: 9 }, (_, i) => [i, new Map()]));
    function gridIndex(i: number, j: number): number{
        return ((Math.floor(i/3))*3)+(Math.floor(j/3));
    }

    for (let i = 0; i < 9; i++) {
        const mapRow: Map<number, number> = new Map();
        const mapColumn: Map<number, number> = new Map();
        for (let j = 0; j < 9; j++) {
            const rawRowVal: string = (<HTMLInputElement>document.getElementById(`${i}${j}`)).value;
            const valueRow: number = customNumber(rawRowVal);
            
            const rawColVal: string = (<HTMLInputElement>document.getElementById(`${j}${i}`)).value;
            const valueColumn: number = customNumber(rawColVal);

            const rowInvalid: boolean = (valueRow === -1 && rawRowVal !== '') || (valueRow < 1 && rawRowVal !== '')|| (valueRow > 9 && rawRowVal !== '') || mapRow.has(valueRow);
            const colInvalid: boolean = (valueColumn === -1 && rawColVal !== '') || (valueColumn < 1 && rawColVal !== '')|| (valueColumn > 9 && rawColVal !== '') || mapColumn.has(valueColumn);
            const gridInvalid: boolean = gridmap.get(gridIndex(i, j)).has(valueRow);

            if(rowInvalid || colInvalid || gridInvalid){
                return false;
            }
            
            if(valueRow !== -1){
                mapRow.set(valueRow, 1);
            }
            if(valueColumn !== -1){
                mapColumn.set(valueColumn, 1);
            }
            if(valueRow !== -1){
                gridmap.get(gridIndex(i, j)).set(valueRow, 1);
            }
        }
    }

    return true;
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

