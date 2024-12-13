import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(13, true).split('\n');

class Point {
	x: number;
	y: number;
	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
	}
}

class Button {
	x: number;
	y: number;
	cost: number;
	constructor(x: number, y: number, cost: number){
		this.x = x;
		this.y = y;
		this.cost = cost;
	}
}

class Machine {
	buttonA: Button;
	buttonB: Button;
	prize: Point;
	cheapest: number | null;
	currentPoint: Point;

	constructor(buttonA: Button, buttonB: Button, prize: Point){
		this.buttonA = buttonA;
		this.buttonB = buttonB;
		this.prize = prize;
		this.cheapest = null;
		this.currentPoint = new Point(0, 0);
	}
}

const machines: Machine[] = []

let i = 0;
const regex = /X[+=](-?\d+),\s*Y[+=](-?\d+)/;
const add = 10000000000000;
while(i < input.length){
	const a = input[i].match(regex) ?? [];
	const b = input[i + 1].match(regex) ?? [];
	const p = input[i + 2].match(regex) ?? [];

	const buttonA = new Button(parseInt(a[1]), parseInt(a[2]), 3);
	const buttonB = new Button(parseInt(b[1]), parseInt(b[2]), 1);
	const prize = new Point(parseInt(p[1]) + add, parseInt(p[2]) + add);

	const machine = new Machine(buttonA, buttonB, prize);
	machines.push(machine);

	i += 4;
}


for(const machine of machines){
	for(let i = 0; i <= add; i++){
		for(let j = 0; j <= add; j++){
			machine.currentPoint.x = machine.buttonA.x * i + machine.buttonB.x * j; 
			machine.currentPoint.y = machine.buttonA.y * i + machine.buttonB.y * j;
			let currentCost = machine.buttonA.cost * i + machine.buttonB.cost * j;
			atPrize(machine, currentCost);
			if(machine.currentPoint.x > machine.prize.x || machine.currentPoint.y > machine.prize.y){
				break;
			}
		}
	}
}

function atPrize(machine: Machine, cost: number){
	if(machine.currentPoint.x === machine.prize.x && machine.currentPoint.y === machine.prize.y){
		if(machine.cheapest === null || cost < machine.cheapest){
			machine.cheapest = cost;
		}
	}
}

let totalTokens = 0;
for(const machine of machines){
	if(machine.cheapest != null){
		totalTokens += machine.cheapest;
	}
}

console.log("Tokens:", totalTokens)