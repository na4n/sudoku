function validateBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = Number(document.getElementById(`${i}${j}`).value);
            if (isNaN(value) || value < 1 || value > 9 || value === undefined) {
                return false;
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        const mapRow = new Map();
        const mapColumn = new Map();
        for (let j = 0; j < 9; j++) {
            const valueRow = Number(document.getElementById(`${i}${j}`).value);
            const valueColumn = Number(document.getElementById(`${j}${i}`).value);

            if ((mapRow.has(valueRow) && valueRow !== undefined) || (mapColumn.has(valueColumn) && valueColumn !== undefined)) {
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
