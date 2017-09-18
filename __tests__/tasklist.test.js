import {Task} from '../app/task';
import {TaskList} from '../app/tasklist';
import {Parser} from '../app/parser';

describe('taskList', () => {
    const parser = new Parser('');
    test('test getProjectList', () => {
        let taskList = new TaskList();
        let taskLine = 'this a is a task +abc +abc +efg +efg';
        let task = parser.parseTdTask(taskLine)
        taskList.push(task);

        expect(taskList.getProjectList()).toEqual(['+abc', '+efg']);
    });

    test('test getContextList', () => {
        let taskList = new TaskList();
        [
            '@c @c @d @d',
            '@e @f @g',
            '@h @h @h'
        ].map((task) => {
            taskList.push(parser.parseTdTask(task));
        });
        expect(taskList.getContextList()).toEqual(['@c', '@d', '@e', '@f', '@g', '@h']);
    });
});
