import { getPuzzleInput } from '../getInput';

const stack = getPuzzleInput(9, false).split('').map(Number);
const disk: string[] = [];

let id = 0;
while(stack.length > 0){
	const files = stack.shift() ?? 0;
	const freeSpace = stack.shift() ?? 0;

	for(let i = 0; i < files; i++){
		disk.push(id.toString());
	}

	disk.push(...'.'.repeat(freeSpace));
	id++;
}

function movePartOne(disk: string[]){
	for(let i = disk.length - 1; i > 0; i--){
		const freeSpace = disk.indexOf('.')
		const file = disk[i];
		if(freeSpace <= i && file !== '.'){
			disk[freeSpace] = file;
			disk[i] = '.'
		}
	}
	return disk;
}

function checkSum(disk: string[]){
	let sum = 0;
	for(let i = 0; i < disk.length; i++){
		const file = disk[i];
		if(file !== '.'){
			sum += i * parseInt(file);
		}
	}
	return sum;
}

console.log("Part 1:", checkSum(movePartOne(JSON.parse(JSON.stringify(disk)))))

