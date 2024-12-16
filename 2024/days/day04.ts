import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(4, false).split('\n').map(a => a.split(''));

let total = 0;
for(let i = 0; i < input.length; i++){
	for(let j = 0; j < input[i].length; j++){
		total += horizontal(i, j);
		total += vertical(i, j);
		total += verticalUp(i, j);
		total += diagonal1(i, j);
		total += diagonal2(i, j);
		total += diagonal3(i, j);
		total += diagonal4(i, j);
		total += backwards(i, j);
	}
}

function horizontal(i: number, j: number){
	if(j + 3 >= input[i].length){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i][j + 1] === 'M' &&
		input[i][j + 2] === 'A' &&
		input[i][j + 3] === 'S'
	){
		return 1;
	}
	return 0;
}

function backwards(i: number, j: number){
	if(j - 3 < 0){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i][j - 1] === 'M' &&
		input[i][j - 2] === 'A' &&
		input[i][j - 3] === 'S'
	){
		return 1;
	}
	return 0;
}

function vertical(i: number, j: number){
	if(i + 3 >= input.length){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i + 1][j] === 'M' &&
		input[i + 2][j] === 'A' &&
		input[i + 3][j] === 'S'
	){
		return 1;
	}
	return 0;
}

function verticalUp(i: number, j: number){
	if(i - 3 < 0){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i - 1][j] === 'M' &&
		input[i - 2][j] === 'A' &&
		input[i - 3][j] === 'S'
	){
		return 1;
	}
	return 0;
}

function diagonal1(i: number, j: number){
	if(i + 3 >= input.length || j + 3 >= input[i].length){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i + 1][j + 1] === 'M' &&
		input[i + 2][j + 2] === 'A' &&
		input[i + 3][j + 3] === 'S'
	){
		return 1;
	}
	return 0;
}

function diagonal2(i: number, j: number){
	if(j - 3 < 0 || i - 3 < 0){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i - 1][j - 1] === 'M' &&
		input[i - 2][j - 2] === 'A' &&
		input[i - 3][j - 3] === 'S'
	){
		return 1;
	}
	return 0;
}

function diagonal3(i: number, j: number){
	if(j - 3 < 0 || i + 3 >= input.length){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i + 1][j - 1] === 'M' &&
		input[i + 2][j - 2] === 'A' &&
		input[i + 3][j - 3] === 'S'
	){
		return 1;
	}
	return 0;
}

function diagonal4(i: number, j: number){
	if(j + 3 > input[i].length || i - 3 < 0){
		return 0;
	}
	if(
		input[i][j] === 'X' &&
		input[i - 1][j + 1] === 'M' &&
		input[i - 2][j + 2] === 'A' &&
		input[i - 3][j + 3] === 'S'
	){
		return 1;
	}
	return 0;
}


console.log("Part 1:", total)

let xMas = 0;
for(let i = 0; i < input.length; i++){
	for(let j = 0; j < input[i].length; j++){
		xMas += bothForwards(i, j);
		xMas += bothBackwards(i, j);
		xMas += oneBackwards(i, j);
		xMas += otherBackwards(i, j);
	}
}

function bothForwards(i: number, j: number){
	if(j + 2 >= input[i].length || i + 2 >= input.length){
		return 0;
	}

	if(
		input[i + 0][j + 0] === 'M' &&
		input[i + 1][j + 1] === 'A' &&
		input[i + 2][j + 2] === 'S' &&
		input[i + 0][j + 2] === 'M' &&
		input[i + 2][j + 0] === 'S'
	){
		return 1;
	}
	return 0;
}

function bothBackwards(i: number, j: number){
	if(j + 2 >= input[i].length || i + 2 >= input.length){
		return 0;
	}

	if(
		input[i + 0][j + 0] === 'S' &&
		input[i + 1][j + 1] === 'A' &&
		input[i + 2][j + 2] === 'M' &&
		input[i + 0][j + 2] === 'S' &&
		input[i + 2][j + 0] === 'M'
	){
		return 1;
	}
	return 0;
}

function oneBackwards(i: number, j: number){
	if(j + 2 >= input[i].length || i + 2 >= input.length){
		return 0;
	}

	if(
		input[i + 0][j + 0] === 'M' &&
		input[i + 1][j + 1] === 'A' &&
		input[i + 2][j + 2] === 'S' &&
		input[i + 0][j + 2] === 'S' &&
		input[i + 2][j + 0] === 'M'
	){
		return 1;
	}
	return 0;
}

function otherBackwards(i: number, j: number){
	if(j + 2 >= input[i].length || i + 2 >= input.length){
		return 0;
	}

	if(
		input[i + 0][j + 0] === 'S' &&
		input[i + 1][j + 1] === 'A' &&
		input[i + 2][j + 2] === 'M' &&
		input[i + 0][j + 2] === 'M' &&
		input[i + 2][j + 0] === 'S'
	){
		return 1;
	}
	return 0;
}

console.log("Part 2:", xMas)