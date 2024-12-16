import { getPuzzleInput } from '../getInput';

const input = getPuzzleInput(11, false).split(" ").map(Number);

function blinks(initialStones: number[], totalBlinks: number): number {
    let stoneCounts: Map<number, number> = new Map();

    for (const stone of initialStones) {
        stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
    }

    for (let blink = 0; blink < totalBlinks; blink++) {
        const newStoneCounts: Map<number, number> = new Map();

        for (const [stone, count] of stoneCounts.entries()) {
            if (stone === 0) {
                newStoneCounts.set(1, (newStoneCounts.get(1) || 0) + count);
            } else if (stone.toString().length % 2 === 0) {
                const str = stone.toString();
                const length = str.length / 2;
                const first = parseInt(str.slice(0, length));
                const second = parseInt(str.slice(length));
                newStoneCounts.set(first, (newStoneCounts.get(first) || 0) + count);
                newStoneCounts.set(second, (newStoneCounts.get(second) || 0) + count);
            } else {
                const newValue = stone * 2024;
                newStoneCounts.set(newValue, (newStoneCounts.get(newValue) || 0) + count);
            }
        }

        stoneCounts = newStoneCounts;
    }

    let totalStones = 0;
    for (const count of stoneCounts.values()) {
        totalStones += count;
    }

    return totalStones;
}

console.log(`Part 2:`, blinks(input, 75));

