import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export function getPuzzleInput (day: number) {
	const path = `../inputs/day${day.toString().padStart(2, '0')}.txt`;
	return readFileSync(path, { encoding: 'utf-8' }).replaceAll('\r', '').trim();
}