import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(14, false).split('\n');

const width = 101;
const height = 103;

class Point {
	x: number;
	y: number;

	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
	}
}

class Robot {
	currentPos: Point;
	velocity: Point;

	constructor(pos: Point, velocity: Point){
		this.currentPos = pos;
		this.velocity = velocity;
	}
}

const robots: Robot[] = [];
for(const line of input){
	const item = line.split(" ");
	const pos = item[0].split("=")[1].split(",").map(Number)
	const vel = item[1].split("=")[1].split(",").map(Number)
	robots.push(new Robot(new Point(pos[0], pos[1]), new Point(vel[0], vel[1])));
}

function move(robot: Robot, times: number){
	for(let i = 0; i < times; i++){
		let x = robot.currentPos.x + robot.velocity.x;
		let y = robot.currentPos.y + robot.velocity.y;

		const wrappedX = ((x % width) + width) % width;
		const wrappedY = ((y % height) + height) % height;

		robot.currentPos.x = wrappedX;
		robot.currentPos.y = wrappedY;
	}
}

const halfW = Math.floor(width / 2);
const halfH = Math.floor(height / 2);

function partOne(times: number, robots: Robot[]){
	let quads = [0, 0, 0, 0];
	for(const robot of robots){
		move(robot, times);
		if(robot.currentPos.x < halfW && robot.currentPos.y < halfH){
			quads[0] += 1;
		}
		else if(robot.currentPos.x > halfW && robot.currentPos.y < halfH){
			quads[1] += 1;
		}
		if(robot.currentPos.x < halfW && robot.currentPos.y > halfH){
			quads[2] += 1;
		}
		if(robot.currentPos.x > halfW && robot.currentPos.y > halfH){
			quads[3] += 1;
		}
	}

	return quads.reduce((a, b) => a * b)
}

function inEasterEgg(robots: Robot[]){
	const map: string[][] = Array.from({ length: height }, () => Array(width).fill("."));
	for(const robot of robots){
		map[robot.currentPos.y][robot.currentPos.x] = "X";
	}

	for(let i = 0; i < height; i++){
		let str = map[i].join('');
		if(str.includes('X'.repeat(10))){
			return true;
		}
	}
	return false;
}


console.log("Part 1:", partOne(100, JSON.parse(JSON.stringify(robots))))

let seconds = 0;
for(let i = 0; i < 10000; i++){
	for(const robot of robots){
		move(robot, 1);
	}
	seconds++;

	if(inEasterEgg(robots)){
		break;
	}
}

console.log("Part 2:", seconds)