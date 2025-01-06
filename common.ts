import * as fs from "fs";
export class Point {
	x: number;
	y: number;
	value: string | number;
	maxWidth: number;
	maxHeight: number;

	isInBounds(){
		return this.x >= 0 && this.y >= 0 && this.x <= this.maxWidth && this.y <= this.maxHeight;
	}

	copy(){
		return new Point(this.x, this.y, this.value, this.maxWidth, this.maxHeight);
	}

	isEqual(point: Point){
		return point.x === this.x && point.y === this.y;
	}

	toString(){
		return `${this.value}`
	}

	nextNewX(dx: -1 | 1){
		const item = this.copy();
		item.x += dx;
		return item;
	}

	nextNewY(dy: -1 | 1){
		const item = this.copy();
		item.y += dy;
		return item;
	}

	constructor(x: number, y: number, value: string | number = "", width: number = 5, height: number = 5){
		this.x = x;
		this.y = y;
		this.value = value;
		this.maxWidth = width;
		this.maxHeight = height;
	}
}

type Node = {
	point: Point;
	cost: number;
}

const instructions = [">" , "v" , "<" , "^"] as const;
export type Instructions = typeof instructions[number];

export const directions = {
	'>': {dx: 1, dy: 0},
	'v': {dx: 0, dy: 1},
	'<': {dx: -1, dy: 0},
	'^': {dx: 0, dy: -1},
} as {[key in Instructions]: {dx: number, dy: number}};

function getDirection(pointA: Point, pointB: Point){
	if(pointA.x - pointB.x > 0){
		return instructions[0];
	}else if(pointA.x - pointB.x < 0){
		return instructions[2];
	}
	
	if(pointA.y - pointB.y > 0){
		return instructions[1];
	}else if(pointA.y - pointB.y < 0){
		return instructions[3];
	}

	return ''
}

export function printToFile(day: number, output: string){
	fs.writeFileSync(`./outputs/${day}`, output, "utf8");
}

export function print2d(output: any[][]){
	console.log(output.map(a => a.join('')).join("\n"));
}

export function dijkstra(grid: string[][], start: Point, target: Point): {paths: Point[][], cost: number} {
	const height = grid.length;
	const width = grid[0].length;

	//Priority Queue
	const queue: Node[] = [];
	const distances: number[][] = Array.from({ length: height }, () => Array(width).fill(Infinity));

	distances[start.y][start.x] = 0;
	queue.push({ point: start, cost: 0});
	
	while(queue.length > 0){
		queue.sort((a, b) => a.cost - b.cost);
		const { point, cost } = queue.shift()!;
		
		if(point.x === target.x && point.y === target.y){
			const paths: Point[][] = [];

			function getPath(point: Point, path: Point[], previous: number){
				const value = distances[point.y][point.x];
				if(value > previous){
					return;
				}
				path.push(point)
				
				if(point.isEqual(start)){
					paths.push(path.reverse());
					return;
				}
				
				for(const dir of Object.values(directions)){
					const newPoint = point.copy();
					newPoint.x += dir.dx;
					newPoint.y += dir.dy;

					if(newPoint.isInBounds()){
						const newPath = path.map(a => a.copy());
						getPath(newPoint, newPath, value)
					}
				}
			}
			
			point.value = ''
			getPath(point, [], distances[point.y][point.x]);
			for(let i = 0; i < paths.length; i++){
				const path = paths[i];
				for(let j = 1; j < path.length; j++){
					path[j].value = getDirection(path[j], path[j - 1]);
				}
			}

			return {paths: paths, cost: cost};
		}
		
		for(const [instr, dir] of Object.entries(directions)){
			const newX = point.x + dir.dx;
			const newY = point.y + dir.dy;
			
			const newPoint = new Point(
				newX,
				newY,
				instr,
				width - 1,
				height - 1
			);
			
			
			if(newPoint.isInBounds() && grid[newY][newX] !== '#'){
				const newCost = cost + 1;
				
				if(newCost < distances[newY][newX]){
					distances[newY][newX] = newCost;
					queue.push({ point: newPoint, cost: newCost});
				}
			}
		}
	}

	return {paths: [], cost: 0};
}
