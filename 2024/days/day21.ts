import { getPuzzleInput } from '../getInput';
import { dijkstra, Point } from '../../common'

const input = getPuzzleInput(21, false).split('\n').map(a => a.split('').map(Number));
const codes: number[][] = []
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
	function move(target: number, robot: Robot, grid: string[][], buttons: Point[]): string[]{
		const start = robot.pointed;
		const end = buttons[target];
		const result = dijkstra(grid, start, end);
		const allPaths: string[] = []

		for(let path of result.paths){
			let pushButtons = "";
			for(let j = 1; j < path.length; j++){
				pushButtons += path[j].value;
			}
			pushButtons += "A"
			allPaths.push(pushButtons);
		}
		robot.pointed = end.copy();
		return allPaths;
	}
	function cartesianProduct(arrays: string[][]) {
		return arrays.reduce((acc, curr) =>
			acc.flatMap(a => curr.map(c => `${a}${c}`)), ['']
		);
	}
	
	let numericMoves: string[][] = [];
	for(const key of code){
		numericMoves.push(move(key, firstRobot, numericGrid, numericButtons));
	}

	function nextRobot(startingMoves: string[]){
		const robot = new Robot();
		let robotMoves: string[] = [];
		for(let comb of startingMoves){
			let moves: string[][] = [];
			for(let key of comb.split('')){
				const target = Object.keys(directions).indexOf(key);
				moves.push(move(target, robot, grid, Object.values(directions)))
			}
	
			robotMoves.push(...cartesianProduct(moves))
		}
	
		robotMoves.sort((a, b) => a.length - b.length);
		const length = robotMoves[0].length;
		robotMoves = robotMoves.filter(a => a.length === length);
		return robotMoves;
	}

	let moves: string[] = cartesianProduct(numericMoves);
	for(let i = 0; i < 2; i++){
		moves = nextRobot(moves)
	}

	return moves[0].length * parseInt(code.slice(0, code.length - 1).join(''))
}

let sum = 0;
for(const code of codes){
	sum += getCode(code);
}
console.log(sum)





