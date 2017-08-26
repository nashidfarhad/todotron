require('tdtask.js')
class TdTasks {
			
	constructor() {
		this.tasks = new tdtask[];
	}
	
	//function to push a task into the array, takes a tdtask object
	function push(task){
		this.tasks.push(task);
	}

	function getTask(){
		return this.task;
	}
}