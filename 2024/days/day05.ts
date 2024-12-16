import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(5, false).split('\n');

class Rule {
	num: number = 0
	pagesAfter: number[] = []
}

const rules: Rule[] = [];
const updates: number[][] = [];

for(const line of input){
	if(line.includes("|")){
		const nums = line.split("|").map(Number);
		const present = rules.find(a => a.num === nums[0]);
		if(present){
			present.pagesAfter.push(nums[1]);
		}
		else {
			const rule = new Rule()
			rule.num = nums[0];
			rule.pagesAfter.push(nums[1]);
			rules.push(rule);
		}
	}
	else if(line.length > 2){
		updates.push(line.split(",").map(Number));
	}
}

const correctUpdates: number[][] = [];
const incorrectUpdates: number[][] = [];

function rightOrder(pages: number[], i: number, rule: Rule){
	for(let j = 0; j < i; j++){
		if(rule.pagesAfter.includes(pages[j])){
			return false;
		}
	}
	return true;
}

for(const pages of updates){
	let incorrect = false;
	for(let i = 0; i < pages.length; i++){
		const page = pages[i];
		const rule = rules.find(a => a.num === page)
		if(rule){
			incorrect = !rightOrder(pages, i, rule)
			if(incorrect){
				break;
			}
		}
	}
	if(!incorrect){
		correctUpdates.push(pages)
	}else {
		incorrectUpdates.push(pages)
	}
}

let sum = 0;
for(const pages of correctUpdates){
	const page = Math.floor(pages.length / 2);
	sum += pages[page]
}

console.log("Part 1:", sum)

for(let pages of incorrectUpdates){
	for(let i = 0; i < pages.length; i++){
		const rule = rules.find(a => a.num === pages[i]);
		if(rule){
			let index = i;
			while(!rightOrder(pages, index, rule) && index > 0){
				const page = pages.splice(index, 1)[0];
				pages.splice(index - 1, 0, page);
				index--;
			}
		}
	}
}

let inSum = 0;
for(const pages of incorrectUpdates){
	const page = Math.floor(pages.length / 2);
	inSum += pages[page]
}

console.log("Part 2:", inSum)