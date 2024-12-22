import { getPuzzleInput } from '../getInput';
import { dijkstra, Point } from '../../common'

const input = getPuzzleInput(21, true).split('\n').map(a => a.split('').map(Number));
const codes: number[][] = []
console.log(input)
for(const line of input){
	line[line.length - 1] = 10;
	codes.push(line)
}

const directions = {
	'^': new Point(1, 0),
	'A': new Point(2, 0, 'A'),
	'<': new Point(0, 1),
	'v': new Point(1, 1),
	'>': new Point(2, 1)
}

class Robot {
	pointed = directions.A;
}

const numericButtons = [new Point(1, 3), new Point(0, 2), new Point(1, 2), new Point(2, 2), new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(2, 3)];
const numericGrid: string[][] = Array.from({ length: 4 }, () => Array(3).fill('.'));
const grid: string[][] = Array.from({ length: 2 }, () => Array(3).fill('.'));
numericGrid[3][0] = '#'
grid[0][0] = '#'


function getCode(code: number[]){	
	const firstRobot = new Robot();
	firstRobot.pointed = numericButtons[10];
	const secondRobot = new Robot();
	const thirdRobot = new Robot();
	function move(target: number, robot: Robot, grid: string[][], buttons: Point[]){
		let pushButtons = "";
		const start = robot.pointed;
		const end = buttons[target];
		const result = dijkstra(grid, start, end);
		for(let i = 1; i < result.paths[0].length; i++){
			pushButtons += result.paths[0][i].value;
		}
		robot.pointed = result.paths[0][result.paths[0].length - 1];
		return pushButtons += "A";
	}
	
	let numericMoves: string[] = [];
	for(const key of code){
		numericMoves.push(...move(key, firstRobot, numericGrid, numericButtons).split(''));
	}
	
	let robotMoves: string[] = []
	for(const moveKey of numericMoves){
		const target = Object.keys(directions).indexOf(moveKey);
		robotMoves.push(...move(target, secondRobot, grid, Object.values(directions)).split(''))
	}
	console.log(robotMoves.join(''))
	
	let secondMoves: string[] = []
	for(const moveKey of robotMoves){
		const target = Object.keys(directions).indexOf(moveKey);
		secondMoves.push(...move(target, thirdRobot, grid, Object.values(directions)).split(''))
	}
	console.log(secondMoves.length, parseInt(code.slice(0, code.length - 1).join('')), secondMoves.join(''))
	return secondMoves.length * parseInt(code.slice(0, code.length - 1).join(''))
}

let sum = 0;
for(const code of codes){
	sum += getCode(code);
}
console.log(sum)





