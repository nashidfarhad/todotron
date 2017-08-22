class tdtask {
	var task : String;
	var createdDate : Date;
	var endDate : Date;
	var dueDate : Date; // keyvalue [due:YYYY-MM-DD]
	var taskID : String; // system generated ID to track each task, keyvalue [id:String]
	var PID : String; // to store the parent task ID, keyvalue [pid:String]
	var project : Array;
	var context : Array;
	var priority : String;
	var isDone : boolean;
	var notes : String; // to store additional notes on a task, keyvalue [notes:String]
		
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