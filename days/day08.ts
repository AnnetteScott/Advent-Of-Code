import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(8, false).split('\n').map(a => a.split(''));
const height = input.length;
const width = input[0].length;
const nodes = new Map<string, Point[]>();

class Point {
	x: number;
	y: number;
	node: string;

	isInBounds(){
		return this.x >= 0 && this.y >= 0 && this.x < width && this.y < height;
	}

	copy(){
		return new Point(this.x, this.y, this.node);
	}

	constructor(x: number, y: number, node: string){
		this.x = x;
		this.y = y;
		this.node = node;
	}
}


for(let y = 0; y < height; y++){
	for(let x = 0; x < width; x++){
		const item = input[y][x];
		if(item !== '.'){
			const point = new Point(x, y, input[y][x]);
			const current = nodes.get(item) ?? [];
			current.push(point);
			nodes.set(item, current);
		}
	}
}

function applyAntiNode(pointA: Point, pointB: Point, direction: -1 | 1){
	let refPoint = direction > 0 ? pointA.copy() : pointB.copy();
	const dy = (pointA.y - pointB.y) * direction;
	const dx = (pointA.x - pointB.x) * direction;
	
	const point = new Point(refPoint.x + dx, refPoint.y + dy, "#");

	if(point.isInBounds()){
		input[point.y][point.x] = point.node;
	}

	return point;
}

for(const [type, points] of nodes.entries()){
	for(let i = 0; i < points.length - 1; i++){
		for(let j = i + 1; j < points.length; j++){
			applyAntiNode(points[i].copy(), points[j].copy(), -1)
			applyAntiNode(points[i].copy(), points[j].copy(), 1)
		}
	}
}

function count(){
	let output = 0;
	for(let y = 0; y < height; y++){
		for(let x = 0; x < width; x++){
			const item = input[y][x];
			if(item === '#'){
				output += 1;
			}
		}
	}
	return output;
}

console.log("Part 1:", count())

function req(pointA: Point, pointB: Point, direction: -1 | 1){
	if(pointA.isInBounds() && pointB.isInBounds()){
		if(direction === 1){
			const ref = pointA.copy();
			pointA = applyAntiNode(pointA, pointB, direction);
			req(pointA, ref, direction);
		}else {
			const ref = pointB.copy();
			pointB = applyAntiNode(pointA, pointB, direction);
			req(ref, pointB, direction);
		}
	}
}

for(const [type, points] of nodes.entries()){
	for(let i = 0; i < points.length - 1; i++){
		for(let j = i + 1; j < points.length; j++){
			req(points[i].copy(), points[j].copy(), -1)
			req(points[i].copy(), points[j].copy(), 1)
		}
	}

	if(points.length > 1){
		for(const point of points){
			input[point.y][point.x] = "#";
		}
	}
}

console.log("Part 2:", count());


