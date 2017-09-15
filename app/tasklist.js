import {Task} from './task';
class TaskList {

    constructor() {
        this.tasks = [];
    }

    //function to push a task into the array, takes a tdtask object
    push(task) {
        if (task instanceof Task)
            this.tasks.push(task);
        else
            alert('Wrong type pushed into TaskList. Expected Task, got ' + typeof task);
    }

    get getTask() {
        return this.task;
    }
}
