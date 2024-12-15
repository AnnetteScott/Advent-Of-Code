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

const input = getPuzzleInput(15, true).split('\n\n').map(a => a.split("\n"));
const maze = input[0].map(a => a.split(''));
const instructions = input[1].map(a => a.split('')) as Instructions[][];
const height = maze.length;
const width = maze[0].length;

const robot = new Robot();
getRobot(maze);

function getRobot(maze: string[][]){
	for(let i = 0; i < maze.length; i++){
		for(let j = 0; j < maze[0].length; j++){
			if(maze[i][j] === '@'){
				robot.position = new Point(j, i);
				return;
			}
		}
	}
}
const directions = {
	'<': {dx: -1, dy: 0},
	'>': {dx: 1, dy: 0},
	'^': {dx: 0, dy: -1},
	'v': {dx: 0, dy: 1},
} as {[key in Instructions]: {dx: number, dy: number}}

function partOne(maze: string[][]){
	function move(instruction: Instructions){
		const {dx, dy} = directions[instruction]
		let boxLength = 0;
		let indexY = robot.position.y + dy;
		let indexX = robot.position.x + dx;

		while(indexX > 0 && indexX < width &&
			indexY > 0 && indexY < height &&
			maze[indexY][indexX] === 'O'
		){
			boxLength++;
			indexX += dx;
			indexY += dy;
		}

		const freeSpace = maze[robot.position.y + dy + (boxLength * dy)][robot.position.x + dx + (boxLength * dx)] === '.'
		
		if(boxLength > 0 && freeSpace){
			for(let i = 1; i <= boxLength; i++){
				const boxX = robot.position.x + (dx * i) + dx;
				const boxY = robot.position.y + (dy * i) + dy;
				maze[boxY][boxX] = 'O'
			}
		}

		if((maze[robot.position.y + dy][robot.position.x + dx] === "O" && freeSpace) || 
			maze[robot.position.y + dy][robot.position.x + dx] === "."
		){
			maze[robot.position.y + dy][robot.position.x + dx] = "@"
			maze[robot.position.y][robot.position.x] = "."
			robot.position.x += dx;
			robot.position.y += dy;
		}
	}

	for(const line of instructions){
		for(const instr of line){
			move(instr);
		}
	}
	
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
	
	console.log(maze.map(a => a.join('')).join("\n"))
	console.log("Part 1:", checkSum());
}

partOne(JSON.parse(JSON.stringify(maze)))

