import * as fs from "fs";
export class Point {
	x: number;
	y: number;
	value: string;
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

	constructor(x: number, y: number, value: string, width: number, height: number){
		this.x = x;
		this.y = y;
		this.value = value;
		this.maxWidth = width;
		this.maxHeight = height;
	}
}

export function printToFile(day: number, output: string){
	fs.writeFileSync(`./outputs/${day}`, output, "utf8");
}

export function print2d(output: any[][]){
	console.log(output.map(a => a.join('')).join("\n"));
}