function validateBoard(){
	for(let i = 0; i < 9; i++){
		const map = new Map();
		Array.from({length: 9}, (_, i) => map.set(i + 1, 0));
		for(let j = 0; j < 9; j++){
			const value = Number(document.getElementById(String(i)+String(j)).value);
			if(value === NaN || value < 1 || value > 9 || map.get(value) != 0){
				return false;
			}
			map.set(value, 1);
		}
	}	

	for(let i = 0; i < 9; i++){
		const map = new Map();
		Array.from({length: 9}, (_, i) => map.set(i + 1, 0));
		for(let j = 0; j < 9; j++){
			const value = Number(document.getElementById(String(j)+String(i)).value);
			if(value === NaN || value < 1 || value > 9 || map.get(value) != 0){
				return false;
			}
			map.set(value, 1);
		}
	}
	
	for (let i = 0; i < 9; i += 3) {
		for (let j = 0; j < 9; j += 3) {
			const map = new Map();
			for (let x = 0; x < 3; x++) {
				for (let y = 0; y < 3; y++) {
					const value = Number(document.getElementById(`${i + x}${j + y}`).value);
					if (isNaN(value) || value < 1 || value > 9 || map.get(value) !== undefined) {
						return false;
					}
					map.set(value, 1);
				}
			}
		}
	}	

	return true;
}