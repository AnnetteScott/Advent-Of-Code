import { getPuzzleInput } from '../getInput';

class Point {
	x: number;
	y: number;

	isInBounds(){
		return this.x >= 0 && this.y >= 0 && this.x < width && this.y < height;
	}

	copy(){
		return new Point(this.x, this.y);
	}

	isEqual(point: Point){
		return point.x === this.x && point.y === this.y;
	}

	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
	}
}

class Robot {
	position = new Point(0,0);
	symbol = "@";
}

class Box {
	pointOne: Point;
	pointTwo: Point;

	constructor(pointOne: Point, pointTwo: Point){
		this.pointOne = pointOne;
		this.pointTwo = pointTwo;
	}
}

type Instructions = "^" | ">" | "<" | "v";

const input = getPuzzleInput(15, false).split('\n\n').map(a => a.split("\n"));
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
	
	/* console.log(maze.map(a => a.join('')).join("\n")) */
	console.log("Part 1:", checkSum());
}

partOne(JSON.parse(JSON.stringify(maze)))

function scaleUp(){
	const newMap: string[][] = Array.from({ length: height }, () => []);
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			if(maze[i][j] === '#'){
				newMap[i].push("#");
				newMap[i].push("#");
			}
			else if(maze[i][j] === 'O'){
				newMap[i].push("[");
				newMap[i].push("]");
			}
			else if(maze[i][j] === '.'){
				newMap[i].push(".");
				newMap[i].push(".");
			}
			else if(maze[i][j] === '@'){
				newMap[i].push("@");
				newMap[i].push(".");
			}
		}
	}
	return newMap;
}

const scaleMaze = scaleUp()
getRobot(scaleMaze);

function partTwo(){
	const width = scaleMaze[0].length;
	function move(instruction: Instructions){
		const boxes = getBoxes(instruction);
		const {dx, dy} = directions[instruction];
		let freeSpace = false;

		if(dx !== 0){
			const length = boxes.length * 2;
			freeSpace = scaleMaze[robot.position.y + dy + (length * dy)][robot.position.x + dx + (length * dx)] === '.'
			
			if(length > 0 && freeSpace){
				for(const box of boxes){
					scaleMaze[box.pointOne.y][box.pointOne.x + dx] = "["
					scaleMaze[box.pointTwo.y][box.pointTwo.x + dx] = "]"
				}
			}
		}else {
			freeSpace = true;
			for(const box of boxes){
				if(scaleMaze[box.pointOne.y + dy][box.pointOne.x] === "#" || 
					scaleMaze[box.pointTwo.y + dy][box.pointTwo.x] === "#"
				){
					freeSpace = false;
					break;
				}
			}

			if(freeSpace){
				for(const box of boxes.sort((a, b) => dy < 0 ? a.pointOne.y - b.pointOne.y : b.pointOne.y - a.pointOne.y)){
					scaleMaze[box.pointOne.y + dy][box.pointOne.x] = "["
					scaleMaze[box.pointTwo.y + dy][box.pointTwo.x] = "]"
					scaleMaze[box.pointOne.y][box.pointOne.x] = "."
					scaleMaze[box.pointTwo.y][box.pointTwo.x] = "."
				}
			}
		}
		

		if((scaleMaze[robot.position.y + dy][robot.position.x + dx] === "[" && freeSpace) || 
			(scaleMaze[robot.position.y + dy][robot.position.x + dx] === "]" && freeSpace) || 
			scaleMaze[robot.position.y + dy][robot.position.x + dx] === "."
		){
			scaleMaze[robot.position.y + dy][robot.position.x + dx] = "@"
			scaleMaze[robot.position.y][robot.position.x] = "."
			robot.position.x += dx;
			robot.position.y += dy;
		}
	}

	function getBoxes(instr: Instructions){
		const boxes: Box[] = []
		const {dx, dy} = directions[instr]
		let indexY = robot.position.y + dy;
		let indexX = robot.position.x + dx;
		if(dx !== 0 && dy === 0){
	
			while(indexX > 0 && indexX < width &&
				indexY > 0 && indexY < height &&
				(
					(scaleMaze[indexY][indexX] === ']' && scaleMaze[indexY][indexX + dx] === '[') ||
					(scaleMaze[indexY][indexX] === '[' && scaleMaze[indexY][indexX + dx] === ']')
				)
			){
				if(scaleMaze[indexY][indexX] === ']'){
					boxes.push(new Box(new Point(indexX + dx, indexY), new Point(indexX, indexY)))
				}else {
					boxes.push(new Box(new Point(indexX, indexY), new Point(indexX + dx, indexY)))
				}
				indexX += (dx * 2);
				indexY += (dy * 2);
			}
		}else if(dy !== 0 && dx == 0){
			function dfsBoxes(point: Point){
				if(point.x < 0 || point.x > width || point.y < 0 || point.y > height){
					return;
				}

				const box = new Box(new Point(point.x, point.y), new Point(point.x + 1, point.y));
				if(scaleMaze[point.y][point.x] === '[' && boxes.filter(a => a.pointOne.isEqual(box.pointOne)).length === 0){
					boxes.push(box);
					dfsBoxes(new Point(point.x, point.y + dy))
					dfsBoxes(new Point(point.x + 1, point.y + dy))
				}
				else if(scaleMaze[point.y][point.x] === ']'){
					dfsBoxes(new Point(point.x - 1, point.y))
				}
			}
			dfsBoxes(new Point(indexX, indexY));
		}
		return boxes;
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
				if(scaleMaze[i][j] === '['){
					sum += (i * 100) + j;
				}
			}
		}
		return sum;
	}
	
	console.log("Part 2:", checkSum());
}

partTwo();