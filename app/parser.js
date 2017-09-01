const { remote } = electronRequire('electron');
const { Menu, dialog } = remote;
const fs = electronRequire('fs');
const readline = electronRequire('readline');

export class Parser {
	constructor(fileName) {
		this.todoFileName = fileName;
	}

	getParsedTodoList(callback) {
		if (this.todoFileName !== undefined &&
			this.todoFileName !== null &&
			this.todoFileName.length !== 0) {
			const rl = readline.createInterface({
				input: fs.createReadStream(this.todoFileName)
			});
			
			let lines = [];

			rl.on('line', function (line) {
				lines.push(line);
			}).on('close',function(){
				callback(lines);
			});
		}
	}
}