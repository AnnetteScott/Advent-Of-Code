import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(12, false).split('\n');

type Point = { x: number; y: number };

function fencePrice(map: string[]) {
	const height = map.length;
	const width = map[0].length;
	const visited: boolean[][] = Array.from({ length: height }, () => Array(width).fill(false));
	let totalPrice = 0;

	const directions = [
		{ x: 0, y: 1 }, // right
		{ x: 0, y: -1 }, // left
		{ x: 1, y: 0 }, // down
		{ x: -1, y: 0 }, // up
	];

	const isValidCell = (x: number, y: number): boolean => {
		return x >= 0 && y >= 0 && x < height && y < width;
	}

	const dfs = (start: Point): { area: number; perimeter: number } => {
		const plant = map[start.x][start.y];
		const stack: Point[] = [start];
		let area = 0;
		let perimeter = 0;

		while (stack.length > 0) {
			const { x, y } = stack.pop()!;
			if (visited[x][y]) continue;
			visited[x][y] = true;
			area++;

			for (const direction of directions) {
				const newX = x + direction.x;
				const newY = y + direction.y;

				if (!isValidCell(newX, newY) || map[newX][newY] !== plant) {
					perimeter++;
				} else if (!visited[newX][newY]) {
					stack.push({ x: newX, y: newY });
				}
			}
		}

		return { area, perimeter };
	};

	for (let x = 0; x < height; x++) {
		for (let y = 0; y < width; y++) {
			if (!visited[x][y]) {
				const { area, perimeter } = dfs({ x, y });
				totalPrice += area * perimeter;
			}
		}
	}

	return totalPrice;
}

console.log("Part 1:", fencePrice(input));