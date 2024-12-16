import { getPuzzleInput } from '../getInput';
import { Point, dijkstraRotation } from '../../common'
const maze = getPuzzleInput(16, false).split('\n').map(a => a.split(""));
const height = maze.length;
const width = maze[0].length;

const start = new Point(0, 0, 'S', width, height);
const end = new Point(0, 0, 'E', width, height);

for(let i = 0; i < height; i++){
	for(let j = 0; j < width; j++){
		if(maze[i][j] === 'S'){
			start.x = j;
			start.y = i;
		}
		if(maze[i][j] === 'E'){
			end.x = j;
			end.y = i;
		}
	}
}

const cost = dijkstraRotation(maze, start, end);
console.log(cost)