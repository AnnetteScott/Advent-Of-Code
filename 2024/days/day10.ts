import { getPuzzleInput } from '../getInput';
import { Point, print2d, printToFile, directions } from '../../common'

const input = getPuzzleInput(10, false).split('\n').map(a => a.split('').map(Number));
const width = input[0].length;
const height = input.length;
const map = input.map((a, y) => a.map((b, x) => new Point(x, y, b, width, height)))

function trailHeads(unique: boolean){
	const trails = new Map<string, Point[]>();

	function dfs(point: Point, previous: number, start: Point, visited: string[]){
		if(!point.isInBounds()){
			return;
		}
		point.value = map[point.y][point.x].value;

		if(point.value !== previous + 1){
			return;
		}

		if(point.value === 9){
			const value = trails.get(start.toString()) ?? [];
			value.push(point);
			trails.set(start.toString(), value);
			return;
		}
		
		dfs(point.nextNewX(1), point.value, start, visited);
		dfs(point.nextNewX(-1), point.value, start, visited);
		dfs(point.nextNewY(1), point.value, start, visited);
		dfs(point.nextNewY(-1), point.value, start, visited);
	}

	for(const col of map){
		for(const point of col){
			if(point.value === 0){
				dfs(point, -1, point, []);
			}
		}
	}

	let sum = 0;

	if(unique){
		for(const [start, ends] of trails.entries()){
			const uniqueTrails = new Set();
			for(const point of ends){
				uniqueTrails.add(point.toString())
			}
			sum += uniqueTrails.size;
		}
	}else {
		for(const [start, ends] of trails.entries()){
			sum += ends.length;
		}
	}

	console.log("Sum:", sum)
}

trailHeads(true)
trailHeads(false)