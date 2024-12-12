import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(6, false).split('\n').map(a => a.split(''));

let x = 0;
let y = 0;
let width = input[0].length;
let height = input.length

function getGuard(){
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

function moveUp(){
	for(let i = y; i >= 0; i--){
		if(input[i][x] === "#"){
			input[y][x] === "."
			y = i + 1;
			x++;
			moveLeft();
			return;
		}else {
			input[i + 1][x] = 'X'
			input[i][x] = '^'
		}
	}
}

function moveLeft(){
	for(let i = x; i < width; i++){
		if(input[y][i] === "#"){
			input[y][x] === "."
			x = i - 1;
			y++;
			moveDown();
			return;
		}else {
			input[y][i - 1] = 'X'
			input[y][i] = '>'
		}
	}
}

function moveDown(){
	for(let i = y; i < height; i++){
		if(input[i][x] === "#"){
			input[y][x] === "."
			y = i - 1;
			x--;
			moveRight();
			return;
		}else {
			input[i - 1][x] = 'X'
			input[i][x] = 'v'
		}
	}
}

function moveRight(){
	for(let i = x; i >= 0; i--){
		if(input[y][i] === "#"){
			input[y][x] === "."
			x = i + 1;
			y--;
			moveUp();
			return;
		}else {
			input[y][i + 1] = 'X'
			input[y][i] = '<'
		}
	}
}


getGuard();
moveUp();

let steps = 0;
function print(){
	let lines = ''
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			if(input[i][j] === "X"){
				steps++;
				lines += "\x1b[31m";
			}
			lines += input[i][j] + " ";
			lines += "\x1b[30m";
		}
		lines += "\n"
	}
	return lines;
}

console.log(print())
console.log("Part 1:", steps)
