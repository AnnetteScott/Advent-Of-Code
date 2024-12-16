import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(2, false).split('\n').map(l => l.split(" ").map(Number));

function getSafe(levels: number[][]){
	let safe = 0;
	for(const reports of levels){
		if(checkSafe(reports)){
			safe++;
		}
	}
	return safe;
}

function checkSafe(level: number[]){
	let previous = undefined as number | undefined;
	for(let i = 1; i < level.length; i++){
		const diff = level[i - 1] - level[i];
		if(diff === 0){
			previous = undefined;
			break;
		}
		if(Math.abs(diff) > 3){
			previous = undefined;
			break;
		}
		const abs = diff / Math.abs(diff);
		if(previous !== undefined && previous !== abs){
			previous = undefined;
			break;
		}
		previous = abs;
	}
	return previous !== undefined;
}

console.log('Part 1:', getSafe(input));

let newLevels: number[][] = []
for(const reports of input){
	if(checkSafe(reports)){
		newLevels.push(reports);
		continue;
	}
	
	for(let i = 0; i < reports.length; i++){
		let copy = [...reports];
		copy.splice(i, 1);
		if(checkSafe(copy)){
			newLevels.push(copy);
			break;
		}
	}
}




console.log('Part 2:', getSafe(newLevels));
