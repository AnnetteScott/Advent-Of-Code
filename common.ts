import * as fs from "fs";
export class Point {
	x: number;
	y: number;
	value: string | number;
	maxWidth: number;
	maxHeight: number;

	isInBounds(){
		return this.x >= 0 && this.y >= 0 && this.x < this.maxWidth && this.y < this.maxHeight;
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

export function dijkstraRotation(grid: string[][], start: Point, target: Point): number | null {
	const height = grid.length;
	const width = grid[0].length;

	const queue: NodeDirection[] = [];
	const costs: Record<string, number> = {};

	queue.push({ point: start, direction: 0, cost: 0 });
	costs[`${start.x},${start.y},1`] = 0;

	while(queue.length > 0){
		queue.sort((a, b) => a.cost - b.cost);
		const current = queue.shift()!;

		const { point, direction, cost } = current;

		if(point.x === target.x && point.y === target.y){
			return cost;
		}

		const forward = new Point(
			point.x + Object.values(directions)[direction].dx,
			point.y + Object.values(directions)[direction].dy,
			'',
			width,
			height
		);

		if(forward.isInBounds() && grid[forward.y][forward.x] !== "#"){
			const forwardKey = `${forward.x},${forward.y},${direction}`;
			const newCost = cost + 1;

			if(newCost < (costs[forwardKey] ?? Infinity)){
				costs[forwardKey] = newCost;
				queue.push({ point: forward, direction, cost: newCost });
			}
		}

		const clockwiseDirection = (direction + 1) % 4;
		const clockwiseKey = `${point.x},${point.y},${clockwiseDirection}`;
		const turnCost = cost + 1000;

		if(turnCost < (costs[clockwiseKey] ?? Infinity)){
			costs[clockwiseKey] = turnCost;
			queue.push({ point, direction: clockwiseDirection, cost: turnCost });
		}

		const counterDirection = (direction + 3) % 4;
		const counterKey = `${point.x},${point.y},${counterDirection}`;

		if(turnCost < (costs[counterKey] ?? Infinity)){
			costs[counterKey] = turnCost;
			queue.push({ point, direction: counterDirection, cost: turnCost });
		}
	}

	return null;
}
