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
        if (projects.length > 0) projects.concat('+none');
        let set = Array.from(new Set(projects)).sort((a, b) => {
            var nameA = (a || '+none').toLowerCase(),
                nameB = (b || '+none').toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });
        let list = {};
        for(var i = 0; i<set.length; i++){
            if(set[i] != null){
                list[set[i]] = projects.filter((project) => project == set[i]).length;
            } else {
                list['+none'] = projects.filter((project) => project == set[i]).length;
            }
        }
        return list;
    }

    // return unique contexts sorted
    getContextList() {
        let contexts = [];
        this.tasks.map((task) => {
            contexts = contexts.concat(task.contexts);
        });
        if (contexts.length > 0) contexts.concat('@none');
        let set = Array.from(new Set(contexts)).sort((a, b) => {
            var nameA = (a || '@none').toLowerCase(),
                nameB = (b || '@none').toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });
        let list = {};
        for(var i = 0; i<set.length; i++){
            if(set[i] != null) {
                list[set[i]] = contexts.filter((context) => context == set[i]).length;
            } else {
                list['@none'] = contexts.filter((context) => context == set[i]).length;
            }
        }
        return list;
    }

    filterByContext(context) {
        let ctx = '@' + context;
        return this.tasks.filter((task) => {
            let ctxs = task.contexts || ['@none'];
            if (ctxs != null)
                return ctxs.indexOf(ctx) >= 0
            else return false;
        });
    }

    filterByProject(project) {
        let pjt = '+' + project;
        return this.tasks.filter((task) => {
            let pjts = task.projects || ['+none'];
            if (pjts != null)
                return pjts.indexOf(pjt) >= 0
            else return false;
        });
    }

    toString() {
        let taskList = "";
        this.tasks.map((task) => {
            taskList += task.toString() + '\r\n';
        });
        return taskList;
    }
}
