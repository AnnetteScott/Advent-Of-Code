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
}

type NodeDirection = {
	point: Point;
	cost: number;
	direction: number;
}

export type Instructions = "^" | ">" | "<" | "v";

export const directions = {
	'>': {dx: 1, dy: 0},
	'v': {dx: 0, dy: 1},
	'<': {dx: -1, dy: 0},
	'^': {dx: 0, dy: -1},
} as {[key in Instructions]: {dx: number, dy: number}}

export function printToFile(day: number, output: string){
	fs.writeFileSync(`./outputs/${day}`, output, "utf8");
}

export function print2d(output: any[][]){
	console.log(output.map(a => a.join('')).join("\n"));
}

export function dijkstra(grid: string[][], start: Point, target: Point): Point[] {
	const height = grid.length;
	const width = grid[0].length;

	const pq: Node[] = [];
	const distances: number[][] = Array.from({ length: height }, () => Array(width).fill(Infinity));
	const prev: (Point | null)[][] = Array.from({ length: height }, () => Array(width).fill(null));

	distances[start.y][start.x] = 0;
	pq.push({ point: start, cost: 0 });
	
	while (pq.length > 0) {
		// Sort the queue to simulate a priority queue
		pq.sort((a, b) => a.cost - b.cost);
		const { point, cost } = pq.shift()!;
		
		if (point.x === target.x && point.y === target.y) {
			// Reconstruct path
			const path: Point[] = [];
			let current: Point | null = point;
			
			while (current) {
				path.push(current);
				current = prev[current.y][current.x];
			}
			
			return path.reverse();
		}
		
		// Explore neighbors
		for (const dir of Object.values(directions)) {
			const newX = point.x + dir.dx;
			const newY = point.y + dir.dy;
			
			const newPoint = new Point(
				newX,
				newY,
				'',
				width - 1,
				height - 1
			);
			
			
			if(newPoint.isInBounds() && grid[newY][newX] !== '#'){
				const newCost = cost + 1;
				
				if(newCost < distances[newY][newX]){
					distances[newY][newX] = newCost;
					prev[newY][newX] = point;
					pq.push({ point: newPoint, cost: newCost });
				}
			}
		}
	}

	return [];
}

export function dijkstraRotation(grid: string[][], start: Point, target: Point, turnCost: number): {path: Point[], cost: number} {
	const height = grid.length;
	const width = grid[0].length;

	const queue: NodeDirection[] = [];
	const costs: Record<string, number> = {};
	const parents: (Point | null)[][] = Array.from({ length: height }, () => Array(width).fill(null));

	queue.push({ point: start, direction: 0, cost: 0 });
	costs[`${start.x},${start.y},1`] = 0;

	while(queue.length > 0){
		queue.sort((a, b) => a.cost - b.cost);
		const current = queue.shift()!;

		const { point, direction, cost } = current;

		if(point.x === target.x && point.y === target.y){
			// Reconstruct path
			const path: Point[] = [];
			let current: Point | null = point;
	  
			while (current) {
				path.push(current);
				current = parents[current.y][current.x];
			}
	  
			return {path: path.reverse(), cost};
		}

		const forward = new Point(
			point.x + Object.values(directions)[direction].dx,
			point.y + Object.values(directions)[direction].dy,
			'O',
			width,
			height
		);

		if(forward.isInBounds() && grid[forward.y][forward.x] !== "#"){
			const forwardKey = `${forward.x},${forward.y},${direction}`;
			const newCost = cost + 1;

			if(newCost < (costs[forwardKey] ?? Infinity)){
				costs[forwardKey] = newCost;
				parents[forward.y][forward.x] = point;
				queue.push({ point: forward, direction, cost: newCost });
			}
		}

		const clockwiseDirection = (direction + 1) % 4;
		const clockwiseKey = `${point.x},${point.y},${clockwiseDirection}`;
		const ckTurnCost = cost + turnCost;

		if(ckTurnCost < (costs[clockwiseKey] ?? Infinity)){
			costs[clockwiseKey] = ckTurnCost;
			queue.push({ point, direction: clockwiseDirection, cost: ckTurnCost });
		}

		const counterDirection = (direction + 3) % 4;
		const counterKey = `${point.x},${point.y},${counterDirection}`;

		if(ckTurnCost < (costs[counterKey] ?? Infinity)){
			costs[counterKey] = ckTurnCost;
			queue.push({ point, direction: counterDirection, cost: ckTurnCost });
		}
	}

	return {path: [], cost: 0};
}
