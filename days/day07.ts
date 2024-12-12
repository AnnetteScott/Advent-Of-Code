import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(7, false).split('\n');

class Equation {
	total: number
	constants: number[]

	constructor(total: number, constants: number[]){
		this.total = total;
		this.constants = constants;
	}
}

const equations: Equation[] = []

input.forEach(a => {
	let line = a.split(":").map(a => a.trim().split(" ")).flat().map(Number)
	equations.push(new Equation(line.shift() ?? 0, line));
})


function permutate(items: string[], count: number) {
	const results: string[] = []
	req([])
	return results
	
	function req(array: string[]) {
		if (array.length == count) {
			results.push(array.join(','))
			return;
		}
		for (const item of items) {
			req(array.concat(item))
		}
	}
}


function part(operators: string[], part: number){
	let sum = 0;
	for(const eq of equations){
		const ops = permutate(operators, eq.constants.length - 1);
		for(const operation of ops){
			let equation = ``;
			let operations = operation.split(',');
			for(const num of eq.constants){
				equation += `${num}`
				equation += `${operations.shift() ?? ''}`
			}

			let total = evaluate(equation);
			if(total === eq.total){
				sum += total;
				break;
			}
		}
	}
	console.log(`Part ${part}:`, sum);
}

function evaluate(equation: string): number {
	const tokens = equation.match(/\d+|[+\-*\/]|\|\|/g);
	if(tokens){
		let result = parseInt(tokens[0], 10);
		let i = 1;
		while (i < tokens.length) {
			const operator = tokens[i];
			const nextNumber = parseInt(tokens[i + 1], 10);
			
			if (operator === "+") {
				result += nextNumber;
			} else if (operator === "*") {
				result *= nextNumber;
			}else if (operator === "||") {
				result = parseInt(`${result}${nextNumber}`);
			}
			i += 2;
		}
		return result;
	}

	return 0;
}

part(['+', '*'], 1)
part(['+', '*', '||'], 2)
