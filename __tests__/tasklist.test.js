import {Task} from '../app/task';
import {TaskList} from '../app/tasklist';
import {Parser} from '../app/parser';

describe('taskList', () => {
    const parser = new Parser('');
    test('test getProjectList', () => {
        let taskList = new TaskList();
        [
            '+c +c +d +d',
            '+e +f +g',
            '+h +h +h'
        ].map((task) => {
            taskList.push(parser.parseTdTask(task));
        });

        expect(taskList.getProjectList()).toEqual({"+c": 2, "+d": 2, "+e": 1, "+f": 1, "+g": 1, "+h": 3});
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
        expect(taskList.getContextList()).toEqual({"@c": 2, "@d": 2, "@e": 1, "@f": 1, "@g": 1, "@h": 3});
    });

    test('getContextList > with no context tasks', () => {
        let taskList = new TaskList();
        [
            '@c @c @d @d',
            'e f g',
            '@h @h @h'
        ].map((task) => {
            taskList.push(parser.parseTdTask(task));
        });
        expect(taskList.getContextList()).toEqual({"@c": 2, "@d": 2, "@h": 3, "@none": 1});
    });

    test('taskList toString method', () => {
        let taskList = new TaskList();
        [
            'setup print logging @ycc +printlogging',
            'NAS offline @sanli',
            'Backup failure @sanli',
            'jennys mac @M&L',
            'restart YCCAD01 @ycc',
            'drop off MAC and Phones @M&L due:2017-08-22'
        ].map((task) => {
            taskList.push(parser.parseTdTask(task));
        });
        let result = 'setup print logging @ycc +printlogging\nNAS offline @sanli\nBackup failure @sanli\njennys mac @M&L\nrestart YCCAD01 @ycc\ndrop off MAC and Phones @M&L due:2017-08-22\n';
        expect(taskList.toString()).toEqual(result);
    });
});
