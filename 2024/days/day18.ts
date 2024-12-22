import { getPuzzleInput } from '../getInput';
import { Point, print2d, printToFile, dijkstra } from '../../common'

const input = getPuzzleInput(18, false).split('\n').map(a => a.split(",").map(Number));
const height = 70;
const width = 70;
const byteLength = 1024;
const start = new Point(0, 0, 'S', width, height);
const end = new Point(width, height, 'E', width, height)


const grid: string[][] = Array.from({ length: height + 1 }, () => Array(width + 1).fill('.'));

function setGrid(grid: string[][], x: number, y: number){
	grid[y][x] = "#"
}

function partOne(grid: string[][]){
	for(let i = 0; i < byteLength; i++){
		setGrid(grid, input[i][0], input[i][1])
	}
	const path = dijkstra(grid, start, end);
	console.log(path.cost)
}

function partTwo(grid: string[][]){
	for(let i = 0; i < input.length; i++){
		setGrid(grid, input[i][0], input[i][1])
		const path = dijkstra(grid, start, end);
		if(path.paths.length <= 0){
			console.log(`${input[i][0]},${input[i][1]}`)
			return;
		}
	}
}

partOne([...grid])
partTwo([...grid])
