import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(13, false).split('\n');

class Equation {
	a: number;
	b: number;
	c: number;
	constructor(a: number, b: number, c: number){
		this.a = a;
		this.b = b;
		this.c = c;
	}
}

let i = 0;
const regex = /X[+=](-?\d+),\s*Y[+=](-?\d+)/;
const add = 10000000000000;
let currentTokens = 0;
while(i < input.length){
	const a = input[i].match(regex) ?? [];
	const b = input[i + 1].match(regex) ?? [];
	const p = input[i + 2].match(regex) ?? [];

	const eqA = new Equation(parseInt(a[1]), parseInt(b[1]), parseInt(p[1]) + add);
	const eqB = new Equation(parseInt(a[2]), parseInt(b[2]), parseInt(p[2]) + add);

	const outcome = solveEquations(eqA, eqB);
	if(outcome.a % 1 === 0 && outcome.b % 1 === 0){
		currentTokens += outcome.a * 3 + outcome.b * 1
	}

	i += 4;
}

function solveEquations(eqA: Equation, eqB: Equation) {
    const a1 = eqA.a, b1 = eqA.b, c1 = eqA.c;
    const a2 = eqB.a, b2 = eqB.b, c2 = eqB.c;

    const determinant = a1 * b2 - a2 * b1;
    
    // Substitution method
    const a = (c1 * b2 - c2 * b1) / determinant;
    const b = (a1 * c2 - a2 * c1) / determinant;

    return { a, b };
}

console.log("Tokens: ", currentTokens)