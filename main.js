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
	
	// for(let i = 0; i < 3; i++){
	// 	const map = new Map();
	// 	for(let j = 0; j < 3; j++){
	// 		Array.from({length: 9}, (_, i) => map.set(i + 1, 0));
	// 		let value;
	// 		value = Number(document.getElementById(String(i*3+0)+String(j*3+0)).value);
	// 		if(value === NaN || value < 1 || value > 9 || map.get(value) != 0){
	// 			return false;
	// 		}
	// 		map.set(value, 1);


	// 		console.log(String(i*3+0)+String(j*3+0));
	// 		console.log(String(i*3+0)+String(j*3+1));
	// 		console.log(String(i*3+0)+String(j*3+2));

	// 		console.log(String(i*3+1)+String(j*3+0));
	// 		console.log(String(i*3+1)+String(j*3+1));
	// 		console.log(String(i*3+1)+String(j*3+2));
		
	// 		console.log(String(i*3+2)+String(j*3+0));
	// 		console.log(String(i*3+2)+String(j*3+1));
	// 		console.log(String(i*3+2)+String(j*3+2));
			
	// 	}
	// }

	for (let i = 0; i < 3; i++) {
		const map = new Map();
		let value; // Move declaration outside the loop
		for (let j = 0; j < 3; j++) {
			Array.from({ length: 9 }, (_, i) => map.set(i + 1, 0));
			value = null; // Reset value before each iteration
			for (let x = 0; x < 3; x++) {
				for (let y = 0; y < 3; y++) {
					value = Number(document.getElementById(String(i * 3 + x) + String(j * 3 + y)).value);
					if (isNaN(value) || value < 1 || value > 9 || map.get(value) !== 0) {
						console.log(String(i*3+x)+String(j*3+y));
						return false;
					}
					map.set(value, 1);
				}
			}
		}
	}
	

	return true;
}