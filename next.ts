import * as fs from "fs";
const year = 2024;
const i = 17;

if(!fs.existsSync(`./${year}`)){
	const write = "import { readFileSync } from 'node:fs';\n\n" +
	"export function getPuzzleInput (day: number, test = false) {\n" +
		"const dayStr = day.toString().padStart(2, '0');\n" +
		"const path = `./inputs/${dayStr}/day${dayStr}${test ? '-test' : ''}.txt`;\n" +
		"return readFileSync(path, { encoding: 'utf-8' }).replaceAll('\\r', '').trim();\n" +
	"}"
	fs.mkdirSync(`./${year}`, { recursive: true });
	fs.writeFileSync(`./${year}/getInput.ts`, write, "utf8");
}

const day = i.toString().padStart(2, "0"); // Formats as "01", "02", etc.
fs.mkdirSync(`./${year}/days`, { recursive: true });
fs.mkdirSync(`./${year}/inputs/${day}`, { recursive: true });



fs.writeFileSync(`./${year}/days/day${day}.ts`, 
	`import { getPuzzleInput } from '../getInput';\n` +
	`import {type Point, print2d, printToFile } from '../../common'` +
	`\n\nconst input = getPuzzleInput(${i}, true).split('\\n');`, 
	"utf8"
);
fs.writeFileSync(`./${year}/inputs/${day}/day${day}-test.txt`, "", "utf8");
fs.writeFileSync(`./${year}/inputs/${day}/day${day}.txt`, "", "utf8");