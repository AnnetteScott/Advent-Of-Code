import { getPuzzleInput } from '../getInput';
import { Point } from '../../common'

const input = getPuzzleInput(19, false).split('\n\n').map(a => a.split('\n'));
const patterns = input[0][0].split(",").map(a => a.replaceAll(' ', ''));
const needed = input[1];

const cache: Record<string, number> = {};
const countDesigns = (towel: string, patterns: string[]): number => {
	if (towel === '') return 1;

    if (cache[towel] !== undefined) return cache[towel];

	cache[towel] = patterns.filter(pattern => towel.startsWith(pattern)).reduce((total, pattern) => total + countDesigns(towel.slice(pattern.length), patterns), 0);

	return cache[towel];
};

let total = 0;
for(const towel of needed){
	const part1 = countDesigns(towel, patterns);
	if(part1 != 0){
		total++;
	}
}

console.log(total)

