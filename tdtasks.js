require('tdtask.js')
class tdtasks {
			
	constructor() {
		this.tasks = new tdtask[];
	}
	function push(task){
		this.tasks.push(task);
	}
}