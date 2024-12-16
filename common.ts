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

	constructor(x: number, y: number, value: string | number, width: number, height: number){
		this.x = x;
		this.y = y;
		this.value = value;
		this.maxWidth = width;
		this.maxHeight = height;
	}
}

export const directions = {
	'<': {dx: -1, dy: 0},
	'>': {dx: 1, dy: 0},
	'^': {dx: 0, dy: -1},
	'v': {dx: 0, dy: 1},
} as {[key: string]: {dx: number, dy: number}}

export function printToFile(day: number, output: string){
	fs.writeFileSync(`./outputs/${day}`, output, "utf8");
}

export function print2d(output: any[][]){
	console.log(output.map(a => a.join('')).join("\n"));
}