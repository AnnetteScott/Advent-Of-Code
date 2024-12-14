import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(12, true).split('\n').map(a => a.split(""));

class Point {
	x: number;
	y: number;

	isInBounds(){
		return this.x >= 0 && this.y >= 0 && this.x < width && this.y < height;
	}

	copy(){
		return new Point(this.x, this.y);
	}

	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
	}
}


class Plant {
	position: Point;
	type: string;
	
	constructor(pos: Point, type: string){
		this.position = pos;
		this.type = type;
	}
}

const height = input.length;
const width = input[0].length;
const garden: Plant[][] = [];
const visited: boolean[][] = Array.from({ length: height }, () => Array(width).fill(false));

function checkPointReq(checkPoint: Point, type: string){
	if(!checkPoint.isInBounds()){
		return;
	}
	
	const visit = visited[checkPoint.y][checkPoint.x];
	if(visit){
		return;
	}

	if(input[checkPoint.y][checkPoint.x] === type){
		const plant = new Plant(checkPoint, type);		
		garden[garden.length - 1].push(plant);
		visited[checkPoint.y][checkPoint.x] = true;
		checkPointReq(new Point(checkPoint.x + 1, checkPoint.y), type);
		checkPointReq(new Point(checkPoint.x - 1, checkPoint.y), type);
		checkPointReq(new Point(checkPoint.x, checkPoint.y + 1), type);
		checkPointReq(new Point(checkPoint.x, checkPoint.y - 1), type);
	}
}

let prev = '';
for(let i = 0; i < height; i++){
	for(let j = 0; j < width; j++){
		if(prev !== input[i][j]){
			garden.push([])
		}
		checkPointReq(new Point(j, i), input[i][j]);
		prev = input[i][j];
	}
}

let tempI = 0;
while(tempI < garden.length){
	if(tempI < garden.length && garden[tempI].length === 0){
		garden.splice(tempI, 1);
	}else {
		tempI++;
	}

}

function getFencePrice(){
	let price = 0;
	for(const region of garden){
		let perimeter = 0;
		for(const plant of region){
			const up = new Point(plant.position.x, plant.position.y - 1);
			const down = new Point(plant.position.x, plant.position.y + 1);
			const left = new Point(plant.position.x - 1, plant.position.y);
			const right = new Point(plant.position.x + 1, plant.position.y);

			if(!up.isInBounds() || input[up.y][up.x] !== plant.type){
				perimeter++;
			}
			if(!down.isInBounds() || input[down.y][down.x] !== plant.type){
				perimeter++;
			}
			if(!left.isInBounds() || input[left.y][left.x] !== plant.type){
				perimeter++;
			}
			if(!right.isInBounds() || input[right.y][right.x] !== plant.type){
				perimeter++;
			}
		}
		price += region.length * perimeter;
	}

	return price;
}


console.log("Part 1:", getFencePrice())
console.log(garden)
}

getSides()