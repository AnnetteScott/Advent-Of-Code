import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export function getPuzzleInput (day: number, test = false) {
	const dayStr = day.toString().padStart(2, '0');
	const path = `../inputs/${dayStr}/day${dayStr}${test ? '-test' : ''}.txt`;
	return readFileSync(path, { encoding: 'utf-8' }).replaceAll('\r', '').trim();
}