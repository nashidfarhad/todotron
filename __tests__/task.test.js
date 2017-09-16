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
});
