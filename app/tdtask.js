class TdTask {
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
	var recur : String;
	var repeat : int;

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

	/*
	 * this method will allow string generation of task to
	 * write in todo.txt file
	 */
	toString() {
		let taskString = '';
		if(isDone)
			taskString += 'x ';
		if(priority != null && priority.length !== 0)
			taskString += `(${priority}) `;
		if(endDate != null && endDate.length !== 0)
			taskString += `${endDate} `;

		taskString += `${createdDate} ${task} `;

		if(taskID != null && taskID.length !== 0)
			taskString += `id:${taskID} `;
		if(PID != null && PID.length !== 0)
			taskString = `pid:${PID} `;
		if(notes != null && notes.length !== 0)
			taskString= `notes:${notes} `;
		if(dueDate != null && dueDate.length !== 0)
			taskString += `due:${dueDate} `;
		if(dueDate != null && dueDate.length !== 0)
			taskString += `due:${endDate} `;
		if(recur != null && recur.length !== 0)
			taskString += `recur:${recur} `;
		if(repeat != null)
			taskString += `repeat:${repeat} `;
		//TODO: append projects and contexts
		return taskString;
	}
}
