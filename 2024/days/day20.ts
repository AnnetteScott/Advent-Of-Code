import { getPuzzleInput } from '../getInput';
import { dijkstra, directions, Point, print2d } from '../../common'

const maze = getPuzzleInput(20, true).split('\n').map(a => a.split(''));
const width = maze[0].length;
const height = maze.length;
const start = new Point(0, 0, 'S', width, height);
const end = new Point(width, height, 'E', width, height)

for(let i = 0; i < height; i++){
	for(let j = 0; j < width; j++){
		if(maze[i][j] === 'S'){
			start.x = j;
			start.y = i;
		}
		if(maze[i][j] === 'E'){
			end.x = j;
			end.y = i;
		}
	}
}

const track = dijkstra(maze, start, end)

function part1(){
	const cheats = new Map<number, number>();
	let total = 0;

	console.log(track.paths)
	
	console.log("Running X")
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			let grid = JSON.parse(JSON.stringify(maze))
			const pointX = new Point(j + 1, i);
			if(grid[i][j] === '#' && track.paths[0].filter(a => a.isEqual(pointX)).length > 0){
				grid[i][j] = '1';
				grid[i][j + 1] = '2';
			}
	
			const path = dijkstra(grid, start, end);
			const cost = track.cost - path.cost;
			cheats.set(cost, (cheats.get(cost) ?? 0) + 1);
			if(cost >= 100){
				total += 1;
			}
		}
		process.stdout.write(`${i / height * 100}%\n`);
	}
	
	console.log("Running Y")
	for(let i = 0; i < height; i++){
		for(let j = 0; j < width; j++){
			let grid = JSON.parse(JSON.stringify(maze))
			const pointY = new Point(j, i + 1);
			if(grid[i][j] === '#' && track.paths[0].filter(a => a.isEqual(pointY)).length > 0){
				grid[i][j] = '1';
				grid[i + 1][j] = '2';
			}
	
			const path = dijkstra(grid, start, end);
			const cost = track.cost - path.cost;
			cheats.set(cost, (cheats.get(cost) ?? 0) + 1);
			if(cost >= 100){
				total += 1;
			}
		}
		process.stdout.write(`${i / height * 100}%\n`);
	}
	
	console.log(cheats);
	console.log(total)
}

part1();

