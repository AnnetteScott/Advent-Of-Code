import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(1).split("\n");
console.log(input)
const listOne: number[] = [];
const listTwo: number[] = [];

for(let line of input){
	const item = line.split("   ").map(Number);
	listOne.push(item[0]);
	listTwo.push(item[1]);
}

listOne.sort();
listTwo.sort();

let sum = 0;
for(let i = 0 ; i < listOne.length; i++){
	sum += Math.abs(listOne[i] - listTwo[i])
}

console.log("Part 1: ", sum)
