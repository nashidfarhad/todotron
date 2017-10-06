import { TokenTypes } from '../app/tokentypes';
import { Task } from '../app/task';
import { TaskToken } from '../app/tasktoken';

describe('task', () => {
    test('priority getter returns priority token', () => {
        let task = new Task();
        task.tokens = [
            new TaskToken('(A)', TokenTypes.PRIORITY)
        ];

        expect(task.priority).toBe('(A)');
    });

    test('priority getter returns null in priority token not present', () => {
        let task = new Task();
        task.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION)
        ];

        expect(task.priority).toBe(null);
    });

    test('isDone getter returns correct value', () => {
        let task = new Task();
        task.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION)
        ];

        expect(task.isDone).toBe(true);
    });

    test('test get projects', () => {
        let task = new Task();
        task.tokens = [
            new TaskToken('+abc', TokenTypes.PROJECT),
            new TaskToken('+abc', TokenTypes.PROJECT),
            new TaskToken('+adbc', TokenTypes.PROJECT),
        ];
        let projects = ['+abc', '+abc', '+adbc'];
        expect(task.projects).toEqual(projects);
    });

    test('test get contexts', () => {
        let task = new Task();
        task.tokens = [
            new TaskToken('@abc', TokenTypes.CONTEXT),
            new TaskToken('@abc', TokenTypes.CONTEXT),
            new TaskToken('@adbc', TokenTypes.CONTEXT),
        ];
        let contexts = ['@abc', '@abc', '@adbc'];
        expect(task.contexts).toEqual(contexts);
    });

    test('test toString()', () => {
        let task = new Task();
        task.tokens = [
            new TaskToken('@abc', TokenTypes.CONTEXT),
            new TaskToken('abc'),
            new TaskToken('@adbc', TokenTypes.CONTEXT),
            new TaskToken('due:2017-10-12', TokenTypes.TAG)
        ];
        let taskString = task.toString();
        expect(taskString).toBe("@abc abc @adbc due:2017-10-12");
    });
});
