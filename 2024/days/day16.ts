import { getPuzzleInput } from '../getInput';
import { Point, dijkstra, print2d } from '../../common'
const maze = getPuzzleInput(16, true).split('\n').map(a => a.split(""));
const height = maze.length;
const width = maze[0].length;

const start = new Point(0, 0, 'S', width - 1, height - 1);
const end = new Point(0, 0, 'E', width - 1, height - 1);

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

const cost = dijkstra(maze, start, end);
console.log(cost)
for(let point of cost.paths[0]){
	maze[point.y][point.x] = "O";
}
print2d(maze)
