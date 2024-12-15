import { getPuzzleInput } from '../getInput';

class Point {
	x: number;
	y: number;

	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
	}
}

class Robot {
	position = new Point(0,0);
	symbol = "@";
}

type Instructions = "^" | ">" | "<" | "v";

const input = getPuzzleInput(15, false).split('\n\n').map(a => a.split("\n"));
const maze = input[0].map(a => a.split(''));
const instructions = input[1].map(a => a.split('')) as Instructions[][];
const height = maze.length;
const width = maze[0].length;

const robot = new Robot();
getRobot();

function getRobot(){
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			if(maze[i][j] === '@'){
				robot.position = new Point(j, i);
				return;
			}
		}
	}
}

function move(instruction: Instructions){
	if(instruction === '<'){
		let boxLength = 0;
		let index = robot.position.x - 1;
		while(index > 0 && maze[robot.position.y][index] === 'O'){
			boxLength++;
			index--;
		}

		const freeSpace = maze[robot.position.y][robot.position.x - boxLength - 1] === '.'
		if(boxLength > 0 && freeSpace){
			for(let i = robot.position.x - 1; i >= robot.position.x - boxLength; i--){
				maze[robot.position.y][i - 1] = 'O'
			}
			maze[robot.position.y][robot.position.x - 1] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.x -= 1;
		}else if(maze[robot.position.y][robot.position.x - 1] === '.'){
			maze[robot.position.y][robot.position.x - 1] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.x -= 1;
		}
	}
	else if(instruction === '>'){
		let boxLength = 0;
		let index = robot.position.x + 1;
		while(index < width && maze[robot.position.y][index] === 'O'){
			boxLength++;
			index++;
		}

		const freeSpace = maze[robot.position.y][robot.position.x + boxLength + 1] === '.'
		if(boxLength > 0 && freeSpace && maze[robot.position.y][robot.position.x + boxLength] !== '#'){
			for(let i = robot.position.x + 1; i <= robot.position.x + boxLength; i++){
				maze[robot.position.y][i + 1] = 'O'
			}
			maze[robot.position.y][robot.position.x + 1] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.x += 1
		}else if(maze[robot.position.y][robot.position.x + 1] === '.'){
			maze[robot.position.y][robot.position.x + 1] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.x += 1
		}
	}
	else if(instruction === '^'){
		let boxLength = 0;
		let index = robot.position.y - 1;
		while(index > 0 && maze[index][robot.position.x] === 'O'){
			boxLength++;
			index--;
		}

		const freeSpace = maze[robot.position.y - boxLength - 1][robot.position.x] === '.'
		if(boxLength > 0 && freeSpace){
			for(let i = robot.position.y - 1; i >= robot.position.y - boxLength; i--){
				maze[i - 1][robot.position.x] = 'O'
			}
			maze[robot.position.y - 1][robot.position.x] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.y -= 1
		}else if(maze[robot.position.y - 1][robot.position.x] === '.'){
			maze[robot.position.y - 1][robot.position.x] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.y -= 1
		}
	}
	else if(instruction === 'v'){
		let boxLength = 0;
		let index = robot.position.y + 1;
		while(index < height && maze[index][robot.position.x] === 'O'){
			boxLength++;
			index++;
		}

		const freeSpace = maze[robot.position.y + boxLength + 1][robot.position.x] === '.'
		if(boxLength > 0 && freeSpace){
			for(let i = robot.position.y + 1; i <= robot.position.y + boxLength; i++){
				maze[i + 1][robot.position.x] = 'O'
			}
			maze[robot.position.y + 1][robot.position.x] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.y += 1
		}else if(maze[robot.position.y + 1][robot.position.x] === '.'){
			maze[robot.position.y + 1][robot.position.x] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.y += 1
		}
	}
}

for(const line of instructions){
	for(const instr of line){
		move(instr);
	}
}
console.log(maze.map(a => a.join('')).join("\n"))

function checkSum(){
	let sum = 0;
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			if(maze[i][j] === 'O'){
				sum += (i * 100) + j;
			}
		}
	}
	return sum;
}


console.log("Part 1:", checkSum());
console.log("Part 2:");