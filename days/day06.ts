import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(6, false).split('\n').map(a => a.split(''));

let x = 0;
let y = 0;
let width = input[0].length;
let height = input.length;
let currentObs = {x: 0, y: 0, visited: 0}
const time = Date.now();

function getGuard(input: string[][]){
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			if(input[i][j] === "^" || 
				input[i][j] === ">" || 
				input[i][j] === "v" || 
				input[i][j] === "<"
			){
				x = j;
				y = i;
				return;
			}
		}
	}
}

function moveUp(input: string[][]){
	for(let i = y; i >= 0; i--){
		if(input[i][x] === "#"){
			if(currentObs.x === x && currentObs.y === i){
				currentObs.visited++;
				if(currentObs.visited > 3){
					return true;
				}
			}
			input[y][x] === "."
			y = i + 1;
			x++;
			moveLeft(input);
			return;
		}else {
			input[i + 1][x] = 'X'
			input[i][x] = '^'

		}
	}
}

function moveLeft(input: string[][]){
	for(let i = x; i < width; i++){
		if(input[y][i] === "#"){
			if(currentObs.x === i && currentObs.y === y){
				currentObs.visited++;
				if(currentObs.visited > 3){
					return true;
				}
			}
			input[y][x] === "."
			x = i - 1;
			y++;
			moveDown(input);
			return;
		}else {
			input[y][i - 1] = 'X'
			input[y][i] = '>'
		}
	}
}

function moveDown(input: string[][]){
	for(let i = y; i < height; i++){
		if(input[i][x] === "#"){
			if(currentObs.x === x && currentObs.y === i){
				currentObs.visited++;
				if(currentObs.visited > 3){
					return true;
				}
			}
			input[y][x] === "."
			y = i - 1;
			x--;
			moveRight(input);
			return;
		}else {
			input[i - 1][x] = 'X'
			input[i][x] = 'v'
		}
	}
}

function moveRight(input: string[][]){
	for(let i = x; i >= 0; i--){
		if(input[y][i] === "#"){
			if(currentObs.x === i && currentObs.y === y){
				currentObs.visited++;
				if(currentObs.visited > 3){
					return true;
				}
			}
			input[y][x] === "."
			x = i + 1;
			y--;
			moveUp(input);
			return;
		}else {
			input[y][i + 1] = 'X'
			input[y][i] = '<'
		}
	}
}

function print(input: string[][]){
	let lines = ''
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			if(input[i][j] === "X"){
				lines += "\x1b[31m";
			}
			lines += input[i][j] + " ";
			lines += "\x1b[30m";
		}
		lines += "\n"
	}
	return lines;
}

function placeObstruction(input: string[][], newInput: string[][]){
	let nextObs = {x: 0, y: 0};
	let currentX = currentObs.x + 1;
	function find(){
		for(let i = currentObs.y; i < height; i++){
			for(let j = currentX; j < width; j++){
				if(input[i][j] === "X" || 
					input[i][j] === "^" || 
					input[i][j] === ">" || 
					input[i][j] === "v" || 
					input[i][j] === "<"
				){
					nextObs.x = j;
					nextObs.y = i;
					return;
				}
			}
			currentX = 0;
		}
	}

	find();

	newInput[nextObs.y][nextObs.x] = "#";
	currentObs.x = nextObs.x;
	currentObs.y = nextObs.y;
}

getGuard(input);
const copy = JSON.parse(JSON.stringify(input)) as string[][];
moveUp(copy);

let steps = 0;
for(let i = 0; i < height; i++){
	for(let j = 0; j < width; j++){
		if(copy[i][j] === "X"){
			steps++;
		}
	}
}
console.log("Part 1:", steps);

let total = 0;
for(let i = 0; i < steps + 1; i++){
	const copy2 = JSON.parse(JSON.stringify(input)) as string[][];
	getGuard(copy2);
	placeObstruction(copy, copy2);
	try {
		currentObs.visited = 0;
		moveUp(copy2);
		if(currentObs.visited > 3){
			total++;
		}
	} catch (error) {
		total++;
	}
}


console.log("Part 2:", total);
console.log(Date.now() - time)

