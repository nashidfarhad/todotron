import {Task} from './task';
import update from 'immutability-helper';

export class TaskList {

    constructor(tasks) {
        if(tasks != null)
            this.tasks = tasks;
        else
            this.tasks = [];
    }

    //function to push a task into the array, takes a tdtask object
    push(task) {
        if (task instanceof Task){
            this.tasks = update(this.tasks, {$push: [task]}); 
            return this.tasks;
        }
        else
            alert('Wrong type pushed into TaskList. Expected Task, got ' + typeof task);
    }

    get getTask() {
        return this.task;
    }

    // returns unique projects
    getProjectList() {
        let projects = [];
        this.tasks.map((task) => {
            projects = projects.concat(task.projects);
        });
        return Array.from(new Set(projects)).sort((a,b) => {
            if(a !== null && b !== null)
                return b.toLowerCase()-a.toLowerCase();
        });
    }

    // return unique contexts sorted
    getContextList() {
        let contexts = [];
        this.tasks.map((task) => {
            contexts = contexts.concat(task.contexts);
        });
        return Array.from(new Set(contexts)).sort((a,b) => {
            if (a !== null && b !== null)
                return b.toLowerCase()-a.toLowerCase();
        });
    }
}
