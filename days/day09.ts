import { getPuzzleInput } from '../getInput';

const stack = getPuzzleInput(9, false).split('').map(Number);
const disk: string[] = [];

let id = 0;
let stackCopy = [...stack];
while(stackCopy.length > 0){
	const files = stackCopy.shift() ?? 0;
	const freeSpace = stackCopy.shift() ?? 0;

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

function movePartTwo(disk: string[]){
	let ignoreList: number[] = [];
	for(let i = disk.length - 1; i > 0; i--){
		const file = disk[i];

		if(ignoreList.includes(parseInt(file)) || file === '.'){
			continue;
		}
		const startI = disk.indexOf(file);
		const blockLength = i - startI + 1;
		const freeSpace = disk.map(a => a !== '.' ? '#' : '.').join('').indexOf('.'.repeat(blockLength));
		if(freeSpace >= 0 && freeSpace < startI){
			for(let j = freeSpace; j < blockLength + freeSpace; j++){
				disk[j] = file;
			}
			for(let j = startI; j < blockLength + startI; j++){
				disk[j] = '.';
			}
		}
		ignoreList.push(parseInt(file));
	}
	return disk;
}

const result = movePartTwo(JSON.parse(JSON.stringify(disk)));
console.log("Part 2:", checkSum(result))