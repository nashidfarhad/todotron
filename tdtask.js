class tdtask {
	var task : String;
	var createdDate : Date;
	var endDate : Date;
	var dueDate : Date;
	var taskID : String;
	var PID : String;
	var project : Array;
	var context : Array;
	var priority : String;
	var isDone : boolean;
		
	constructor(task, createdDate, endDate, dueDate, taskID, PID, project, context, priority, isDone) {
		this.task = task;
		this.createdDate = createdDate;
		this.endDate = endDate;
		this.dueDate = dueDate;
		this.taskID = taskID;
		this.PID = PID;
		this.project = project;
		this.context = context;
		this.priority = priority;
		this.isDone = isDone;
	}
	
}