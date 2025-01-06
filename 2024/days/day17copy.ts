import * as fs from 'fs';

// Read and parse input file
const input = fs.readFileSync("C:/Users/Annet/Documents/GitHub/Advent-Of-Code/2024/inputs/17/day17.txt", 'utf-8');
const [registersData, programsData] = input.split('\n\n');

// Parse registers
const registersOriginal: Record<string, number> = Object.fromEntries(
    registersData.split('\n').map(line => {
        const [key, value] = line.split(': ');
        return [key.split(' ')[1], parseInt(value)];
    })
);

// Parse programs
const programs: number[] = programsData.replace('\n', '').split(' ')[1].split(',').map(Number);

// Utility function: combo
function combo(num: number, registers: Record<string, number>): number {
    if (num <= 3) return num;
    if (num === 4) return registers['A'];
    if (num === 5) return registers['B'];
    if (num === 6) return registers['C'];
    return 0;
}

// Function implementations
function adv(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    registers['A'] = Math.floor(registers['A'] / (2 ** combo(num, registers)));
    return [registers, instr + 2, outputs];
}

function bxl(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    registers['B'] ^= num;
    return [registers, instr + 2, outputs];
}

function bst(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    registers['B'] = combo(num, registers) % 8;
    return [registers, instr + 2, outputs];
}

function jnz(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    return registers['A'] === 0 ? [registers, instr + 2, outputs] : [registers, num, outputs];
}

function bxc(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    registers['B'] ^= registers['C'];
    return [registers, instr + 2, outputs];
}

function out(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    outputs.push(combo(num, registers) % 8);
    return [registers, instr + 2, outputs];
}

function bdv(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    registers['B'] = Math.floor(registers['A'] / (2 ** combo(num, registers)));
    return [registers, instr + 2, outputs];
}

function cdv(num: number, registers: Record<string, number>, instr: number, outputs: number[]) {
    registers['C'] = Math.floor(registers['A'] / (2 ** combo(num, registers)));
    return [registers, instr + 2, outputs];
}

// Get output function
function getOutput(a: number): number[] {
    let outputs: number[] = [];
    let registers = JSON.parse(JSON.stringify(registersOriginal)); // Deep copy
    registers['A'] = a;

    const length = programs.length;
    let instr = 0;

    const functions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

    while (instr >= 0 && instr < length) {
        const opcode = programs[instr];
        const func = functions[opcode];
        const num = programs[instr + 1];
		//@ts-ignore
        [registers, instr, outputs] = func(num, registers, instr, outputs);
    }

    return outputs;
}

// Main logic
let valid: number[] = [0];

for (let length = 1; length <= programs.length; length++) {
    const oldValid = valid;
    valid = [];

    for (const num of oldValid) {
        for (let offset = 0; offset < 8; offset++) {
            const newNum = 8 * num + offset;
            if (JSON.stringify(getOutput(newNum)) === JSON.stringify(programs.slice(-length))) {
                valid.push(newNum);
            }
        }
    }
}

const answer = Math.min(...valid);
console.log(answer);
