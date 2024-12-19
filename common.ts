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
		return `${this.x},${this.y}`
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
	direction: Instructions;
}

const instructions = [">" , "v" , "<" , "^"] as const;
export type Instructions = typeof instructions[number];

export const directions = {
	'>': {dx: 1, dy: 0},
	'v': {dx: 0, dy: 1},
	'<': {dx: -1, dy: 0},
	'^': {dx: 0, dy: -1},
} as {[key in Instructions]: {dx: number, dy: number}};

type DijkstraQueue = {[key in Instructions]: {dx: number, dy: number, cost: number}};

export function printToFile(day: number, output: string){
	fs.writeFileSync(`./outputs/${day}`, output, "utf8");
}

export function print2d(output: any[][]){
	console.log(output.map(a => a.join('')).join("\n"));
}

export function dijkstra(grid: string[][], start: Point, target: Point, rotation = false, rotationCost = 1, startingDirection: Instructions = '>'): {paths: Point[][], cost: number} {
	const height = grid.length;
	const width = grid[0].length;

	//Priority Queue
	const queue: Node[] = [];
	const distances: number[][] = Array.from({ length: height }, () => Array(width).fill(Infinity));
	const prev: (Point | null)[][] = Array.from({ length: height }, () => Array(width).fill(null));

	distances[start.y][start.x] = 0;
	queue.push({ point: start, cost: 0, direction: startingDirection});
	
	while(queue.length > 0){
		queue.sort((a, b) => a.cost - b.cost);
		const { point, cost, direction } = queue.shift()!;
		
		if(point.x === target.x && point.y === target.y){
			const path: Point[] = [];
			let current: Point | null = point;

			while (current) {
				path.push(current);
				current = prev[current.y][current.x];
			}
			
			return {paths: [path.reverse()], cost: cost};
		}

		let neighbors = {} as DijkstraQueue;
		if(rotation){
			neighbors[direction] = {dx: directions[direction].dx, dy: directions[direction].dy, cost: 1};
			const index = instructions.indexOf(direction as Instructions);
			const clockwise = instructions[(index + 1) % 4];
			const counter = instructions[(index + 3) % 4];
			neighbors[clockwise] = {dx: directions[clockwise].dx, dy: directions[clockwise].dy, cost: rotationCost};
			neighbors[counter] = {dx: directions[counter].dx, dy: directions[counter].dy, cost: rotationCost};
		}else {
			for(const str of instructions){
				neighbors[str] = {dx: directions[str].dx, dy: directions[str].dy, cost: 1}
			}
		}
		
		for(const [instr, dir] of Object.entries(neighbors)){
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
				const newCost = cost + dir.cost;
				
				if(newCost < distances[newY][newX]){
					distances[newY][newX] = newCost;
					prev[newY][newX] = point;
					queue.push({ point: newPoint, cost: newCost, direction: instr as Instructions});
				}
			}
		}
	}

	return {paths: [], cost: 0};
}
