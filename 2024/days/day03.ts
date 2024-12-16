import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(3, false);

function checkMul(i: number){
	let sum = 0;
	let firstNum = '';
	let secondNum = '';
	let first = input.at(i);
	let second = input.at(i + 1);
	let third = input.at(i + 2 );
	let fourth = input.at(i + 3 );
	
	if(first === 'm' && second === 'u' && third === 'l' && fourth === '('){
		let j = i + 4;
		while(input.at(j) && !isNaN(parseInt(input.at(j) ?? ''))){
			firstNum += input.at(j)
			j++;
		}
		j++;
		while(input.at(j) && !isNaN(parseInt(input.at(j) ?? ''))){
			secondNum += input.at(j)
			j++;
		}
		const last = input.at(j);

		if(last === ')'){
			sum += parseInt(firstNum) * parseInt(secondNum);
		}
	}
	firstNum = '';
	secondNum = '';
	return sum;
}

let sum = 0;
for(let i = 0; i < input.length; i++){
	sum += checkMul(i);
}

console.log("Part 1:", sum)

let sumPart2 = 0;
let enabled = true;
for(let i = 0; i < input.length; i++){
	if(input.at(i) === 'd' && 
		input.at(i + 1) === 'o' &&
		input.at(i + 2) === '(' &&
		input.at(i + 3) === ')'
	){
		enabled = true;
	}else if(input.at(i) === 'd' && 
		input.at(i + 1) === 'o' &&
		input.at(i + 2) === 'n' &&
		input.at(i + 3) === "'" &&
		input.at(i + 4) === "t" &&
		input.at(i + 5) === '(' &&
		input.at(i + 6) === ')'
	){
		enabled = false;
	}

	if(enabled){
		sumPart2 += (checkMul(i));
	}
}

console.log("Part 2:", sumPart2)