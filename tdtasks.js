require('tdtask.js')
class tdtasks {
			
	constructor() {
		this.tasks = new tdtask[];
	}
	
	//function to push a task into the array, takes a tdtask object
	function push(task){
		this.tasks.push(task);
	}
}