import { getPuzzleInput } from '../getInput';
import { Point, print2d, printToFile, directions } from '../../common'

const input = getPuzzleInput(17, false).split('\n\n');
type reg = "A" | "B" | "C"
const registers: {[key in reg]: number} = {'A': 0, 'B': 0, 'C': 0};
const instructions = input[1].split(":")[1].split(',').map(Number);

const combo = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 'A',
	5: 'B',
	6: 'C'
} as {[key: number]: number | reg}

for(const line of input[0].split('\n')){
	const items = line.split(" ");
	registers[items[1].split(":")[0] as keyof typeof registers] = parseInt(items[2]);
}

let pointer = 0;
let output = '';

function adv(){
	const operand = instructions[pointer + 1];
	const numerator = registers.A;
	const value = typeof combo[operand] === 'string' ? registers[combo[operand] as reg] : combo[operand] as number;
	const denominator = Math.pow(2, value);
	registers.A = Math.trunc(numerator / denominator);
	pointer += 2;
}

function bxl(){
	const operand = instructions[pointer + 1];
	registers.B = registers.B ^ operand;
	pointer += 2;
}

function bst(){
	const operand = instructions[pointer + 1];
	const value = typeof combo[operand] === 'string' ? registers[combo[operand] as reg] : combo[operand] as number;
	registers.B = value % 8;
	pointer += 2;
}

function jnz(){
	const operand = instructions[pointer + 1];
	if(registers.A === 0){
		pointer += 2;
		return;
	}
	pointer = operand;
}

function bxc(){
	registers.B = registers.B ^ registers.C;
	pointer += 2;
}

function out(){
	const operand = instructions[pointer + 1];
	const value = typeof combo[operand] === 'string' ? registers[combo[operand] as reg] : combo[operand] as number;
	output += `${value % 8},`
	pointer += 2;
}

function bdv(){
	const operand = instructions[pointer + 1];
	const numerator = registers.A;
	const value = typeof combo[operand] === 'string' ? registers[combo[operand] as reg] : combo[operand] as number;
	const denominator = Math.pow(2, value);
	registers.B = Math.trunc(numerator / denominator);
	pointer += 2;
}

function cdv(){
	const operand = instructions[pointer + 1];
	const numerator = registers.A;
	const value = typeof combo[operand] === 'string' ? registers[combo[operand] as reg] : combo[operand] as number;
	const denominator = Math.pow(2, value);
	registers.C = Math.trunc(numerator / denominator);
	pointer += 2;
}

const functions: { [key: number]: () => void } = {
	0: adv,
	1: bxl,
	2: bst,
	3: jnz,
	4: bxc,
	5: out,
	6: bdv,
	7: cdv
}

function runPart(){
	pointer = 0;
	output = "";
	while(pointer < instructions.length){
		const instr = instructions[pointer];
		functions[instr]?.();
		if(output.indexOf("-") > -1){
			break;
		}
	}
}

runPart()
console.log(output);

function checkOutput(startingI: number){
	const outputArray = output.slice(0, output.length - 1).split(',').map(Number);
	process.stdout.write(`${output} ${startingI}\n`);
	console.log(outputArray)
	if(outputArray.length !== instructions.length){
		return false;
	}
	for(let i = 0; i < instructions.length; i++){
		if(outputArray[i] !== instructions[i]){
			return false;
		}
	}
	return true;
}

//2,4,1,1,7,5,4,4,1,4,0,3,5,5,3,0
//let startingI = 35184372000000;
  let startingI = 202991746427434;
//let startingI = 202991746427434;
let found = false;
registers.A = startingI;
registers.B = 0;
registers.C = 0;

runPart();
console.log(output, instructions)
if(output.length > 30){
	found = checkOutput(startingI);
}
startingI += 1;

/* while(!found){
	registers.A = startingI;
	registers.B = 0;
	registers.C = 0;

	runPart();
	if(output.length > 30){
		found = checkOutput(startingI);
	}
	startingI += 1;
}
 */
console.log(found, startingI - 1)

