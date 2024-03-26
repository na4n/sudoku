function customNumber(n){
    const a = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if(a.includes(n)){
        return Number(n);
    }
    else{
        return -1;
    }
}

function validateBoard() {
    const gridmap = new Map();
    for(let i = 0; i < 9; i++){
        gridmap.set(i, new Map());
    }

    for (let i = 0; i < 9; i++) {
        const mapRow = new Map();
        const mapColumn = new Map();
        for (let j = 0; j < 9; j++) {
            const rawRowVal = document.getElementById(`${i}${j}`).value;
            const valueRow = customNumber(rawRowVal);
            
            const rawColVal = document.getElementById(`${j}${i}`).value;
            const valueColumn = customNumber(rawColVal);

            const rowInvalid = (valueRow === -1 && rawRowVal !== '') || (valueRow < 1 && rawRowVal !== '')|| (valueRow > 9 && rawRowVal !== '') || mapRow.has(valueRow);
            const colInvalid = (valueColumn === -1 && rawColVal !== '') || (valueColumn < 1 && rawColVal !== '')|| (valueColumn > 9 && rawColVal !== '') || mapColumn.has(valueColumn);

            if (rowInvalid || colInvalid) {
                console.log(rowInvalid);
                console.log(`${i}${j}`);
                console.log(colInvalid);
                console.log(`${j}${i}`);
                console.log('invalid row or column');
                return false;
            }
            
            if(valueRow !== -1){
                mapRow.set(valueRow, 1);
            }
            if(valueColumn !== -1){
                mapColumn.set(valueColumn, 1);
            }

            if(gridmap.get((i%3)*3+(j%3)).has(valueRow)){
                console.log('invalid grid');
                return false;
            }
            gridmap.get((i%3)*3+(j%3)).set(valueRow, 1);
        }
    }

    // for (let i = 0; i < 9; i += 3) {
    //     for (let j = 0; j < 9; j += 3) {
    //         const subgridMap = new Map();
    //         for (let x = 0; x < 3; x++) {
    //             for (let y = 0; y < 3; y++) {
    //                 const valueSubgrid = Number(document.getElementById(`${i + x}${j + y}`).value);
    //                 if (subgridMap.has(valueSubgrid)) {
    //                     return false;
    //                 }
    //                 subgridMap.set(valueSubgrid, 1);
    //             }
    //         }
    //     }
    // }

    return true;
}

// const potentialValue = new Map();
// function findPotentialValues() {
//     for (let i = 0; i < 9; i++) {
//         const arr = [];
//         let hashmap = new Map(Array.from({ length: 9 }, (_, i) => [i + 1, 1]));
//         for (let j = 0; j < 9; j++) {
//             const rowEle = document.getElementById(`${i}${j}`);
//             if (rowEle.value === '') {
//                 arr.push(`${i}${j}`);
//             }
//             else {
//                 hashmap.set(Number(rowEle.value), 0);
//             }
//         }
//         const values = [];
//         for (let i = 1; i < 10; i++) {
//             if (hashmap.get(i) === 1) {
//                 values.push(i);
//             }
//         }

//         for (let i = 0; i < arr.length; i++) {
//             if (potentialValue.get(arr[i]) === undefined) {
//                 potentialValue.set(arr[i], values);
//             }
//             else {
//                 potentialValue.set(arr[i], potentialValue.get(arr[i]).concat(values));
//             }
//         }

//     }

//     for (let j = 0; j < 9; j++) {
//         const arr = [];
//         let hashmap = new Map(Array.from({ length: 9 }, (_, i) => [i + 1, 1]));
//         for (let i = 0; i < 9; i++) {
//             const rowEle = document.getElementById(`${i}${j}`);
//             if (rowEle.value === '') {
//                 arr.push(`${i}${j}`);
//             }
//             else {
//                 hashmap.set(Number(rowEle.value), 0)
//             }
//         }
//         const values = [];
//         for (let i = 1; i < 10; i++) {
//             if (hashmap.get(i) === 1) {
//                 values.push(i);
//             }
//         }

//         for (let i = 0; i < arr.length; i++) {
//             if (potentialValue.get(arr[i]) === undefined) {
//                 potentialValue.set(arr[i], values);
//             }
//             else {
//                 potentialValue.set(arr[i], Array.from(new Set(potentialValue.get(arr[i]).concat(values))));
//             }
//         }

//     }
//     c
// }
