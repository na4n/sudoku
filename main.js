function validateBoard() {
    function customNumber(n){
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(n) ? Number(n) : -1;
    }    

    const gridmap = new Map(Array.from({ length: 9 }, (_, i) => [i, new Map()]));

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
                return false;
            }
            
            if(valueRow !== -1){
                mapRow.set(valueRow, 1);
            }
            if(valueColumn !== -1){
                mapColumn.set(valueColumn, 1);
            }
            
            if(valueRow !== -1){
                if(gridmap.get(((Math.floor(i/3))*3)+(Math.floor(j/3))).has(valueRow)){
                    return false;
                }
                gridmap.get(((Math.floor(i/3))*3)+(Math.floor(j/3))).set(valueRow, 1);    
            }
        }
    }

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
