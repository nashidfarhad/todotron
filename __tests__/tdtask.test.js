import { TokenTypes } from '../app/tokentypes';
import { TdTask } from '../app/tdtask';
import { TaskToken } from '../app/tasktoken';

describe('tdtask', () => {
    test('priority getter returns priority token', () => {
        let tdtask = new TdTask();
        tdtask.tokens = [
            new TaskToken('(A)', TokenTypes.PRIORITY)
        ];

        expect(tdtask.priority).toBe('(A)');
    });

    test('priority getter returns null in priority token not present', () => {
        let tdtask = new TdTask();
        tdtask.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION)
        ];

        expect(tdtask.priority).toBe(null);
    });

    test('isDone getter returns correct value', () => {
        let tdtask = new TdTask();
        tdtask.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION)
        ];

        expect(tdtask.isDone).toBe(true);
    });
});