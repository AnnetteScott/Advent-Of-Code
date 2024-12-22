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

const allCheats: Point[][] = [];
const cheats = new Map<number, number>();

const visited: boolean[][] = Array.from({ length: height }, () => Array(width).fill(false));

function req(point: Point, path: Point[]){
	process.stdout.write(`${point}\n`);
	if(!point.isInBounds() || path.length > 20){
		return;
	}

	if((path.length > 0 && maze[point.y][point.x] !== '#') || visited[point.y][point.x]){
		return;
	}

	visited[point.y][point.x] = true;

	path.push(point);
	if(track.paths[0].filter(a => a.isEqual(point)).length > 0 && path.length > 1 && checkForCheat(path)){
		allCheats.push(path);
		return;
	}


	for(const [instr, dir] of Object.entries(directions)){
		const newPoint = new Point(point.x + dir.dx, point.y + dir.dy, instr, width - 1, height - 1);
		req(newPoint, [...path]);
	}
}

function checkForCheat(path: Point[]){
	const s = path[0];
	const e = path[path.length - 1];

	const starting = allCheats.filter(row => row.some(point => point.isEqual(new Point(3, end.y)))).length === 0;
	const ending = allCheats.filter(row => row.some(point => point.isEqual(new Point(3, end.y)))).length === 0;

	return starting && ending
}

req(start, []);
console.log(allCheats)

let total = 0;
for(const path of allCheats){
	const grid = JSON.parse(JSON.stringify(maze));
	for(const point of path){
		grid[point.y][point.x] = '.'
	}
	const outcome = dijkstra(grid, start, end);
	const cost = track.cost - outcome.cost;
	cheats.set(cost, (cheats.get(cost) ?? 0) + 1);
	if(cost >= 100){
		total += 1;
	}
}

/* const newPath = allCheats.filter(row => row.some(point => point.isEqual(new Point(3, end.y))));
console.log(newPath) */
