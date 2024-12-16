import * as fs from "fs";
import * as path from "path";

for (let i = 1; i <= 25; i++) {
	const folderName = i.toString().padStart(2, "0"); // Formats as "01", "02", etc.
	fs.writeFileSync(`./days/day${folderName}.ts`, `import { getPuzzleInput } from '../getInput';\n\nconst input = getPuzzleInput(${i}, true).split('\\n');`, "utf8");
}