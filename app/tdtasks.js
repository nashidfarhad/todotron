require('tdtask.js')
class TdTasks {

    constructor() {
        this.tasks = new tdtask[];
    }

    //function to push a task into the array, takes a tdtask object
    push(task) {
        this.tasks.push(task);
    }

    get getTask() {
        return this.task;
    }
}
