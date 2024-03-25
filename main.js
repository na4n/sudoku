function validateBoard() {
    for (let i = 0; i < 9; i++) {
        const mapRow = new Map();
        const mapColumn = new Map();
        for (let j = 0; j < 9; j++) {
            const valueRow = Number(document.getElementById(`${i}${j}`).value);
            const valueColumn = Number(document.getElementById(`${j}${i}`).value);

            const rowInvalid = isNaN(valueRow) || valueRow < 1 || valueRow > 9 || mapRow.has(valueRow);
            const colInvalid = isNaN(valueColumn) || valueColumn < 1 || valueColumn > 9 || mapColumn.has(valueColumn);

            if (rowInvalid || colInvalid) {
                return false;
            }

            mapRow.set(valueRow, 1);
            mapColumn.set(valueColumn, 1);
        }
    }

    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const subgridMap = new Map();
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    const valueSubgrid = Number(document.getElementById(`${i + x}${j + y}`).value);
                    if (subgridMap.has(valueSubgrid)) {
                        return false;
                    }
                    subgridMap.set(valueSubgrid, 1);
                }
            }
        }
    }

    return true;
}

const potentialValue = new Map();
function findPotentialValues(){
    for(let i = 0; i < 9; i++){  
        const arr = [];      
        let hashmap = new Map(Array.from({length: 9}, (_, i) => [i + 1, 1]));
        for(let j = 0; j < 9; j++){
            const rowEle = document.getElementById(`${i}${j}`);
            if(rowEle.value === ''){
                arr.push(`${i}${j}`);
            }
            else{
                hashmap.set(Number(rowEle.value), 0);
            }
        }
        const values = [];
        for(let i = 1; i < 10; i++){
            if(hashmap.get(i) === 1){
                values.push(i);
            }
        }
        
        for(let i = 0; i < arr.length; i++){
            if(potentialValue.get(arr[i]) === undefined){
                potentialValue.set(arr[i], values);
            }
            else{
                potentialValue.set(arr[i], potentialValue.get(arr[i]).concat(values));
            }
        }
        
    }

    for(let j = 0; j < 9; j++){  
        const arr = [];      
        let hashmap = new Map(Array.from({length: 9}, (_, i) => [i + 1, 1]));
        for(let i = 0; i < 9; i++){
            const rowEle = document.getElementById(`${i}${j}`);
            if(rowEle.value === ''){
                arr.push(`${i}${j}`);
            }
            else{
                hashmap.set(Number(rowEle.value), 0)
            }
        }
        const values = [];
        for(let i = 1; i < 10; i++){
            if(hashmap.get(i) === 1){
                values.push(i);
            }
        }
        
        for(let i = 0; i < arr.length; i++){
            if(potentialValue.get(arr[i]) === undefined){
                potentialValue.set(arr[i], values);
            }
            else{
                potentialValue.set(arr[i], Array.from(new Set(potentialValue.get(arr[i]).concat(values))));
            }
        }
        
    }
    
}
