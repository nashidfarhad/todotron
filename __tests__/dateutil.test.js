import { DateUtil } from '../app/dateutil';
import { TaskToken } from '../app/tasktoken';
import { TokenTypes } from '../app/tokentypes';

describe('DateUtil', () => {
    test('currentDate returns current date without time', () => {
        let dtStr1 = (new Date()).toISOString().split('T')[0];
        let dtStr2 = DateUtil.currentDate().toISOString().split('T')[0];
        let tmStr = DateUtil.currentDate().toISOString().split('T')[1];
        expect(dtStr2).toBe(dtStr1);
        expect(tmStr).toBe('00:00:00.000Z');
    });

    test('currentDateToken returns current date as CREATION_DATE token', () => {
        let dtStr1 = (new Date()).toISOString().split('T')[0];
        let dtTok = DateUtil.currentDateToken();
        expect(dtTok instanceof TaskToken).toBe(true);
        expect(dtTok.token).toBe(dtStr1);
        expect(dtTok.tokenType).toBe(TokenTypes.CREATION_DATE);
    });

    test('date regex matches format "yyyy-mm-dd"', () => {
        expect(DateUtil.dateRegex.test('2016-01-01')).toBe(true);
        expect(DateUtil.dateRegex.test('2016-1-1')).toBe(true);
        expect(DateUtil.dateRegex.test('2016/01/01')).toBe(false);
    });

    test('parsing date should return date object', () => {
        expect(Object.prototype.toString.call(DateUtil.parseDate('2016-01-01')))
        .toBe('[object Date]');
    });

    test('parsing invalid date should return null', () => {
        expect(DateUtil.parseDate('2016-30-30')).toBe(null);
    });

    test('isPastDate returns true for passed date', () => {
        let dt1 = new Date('2016-01-01');
        let dt2 = new Date('2500-01-01');
        let currDt = DateUtil.currentDate();
        expect(DateUtil.isPastDate(dt1)).toBe(true);
        expect(DateUtil.isPastDate(dt2)).toBe(false);
        expect(DateUtil.isPastDate(currDt)).toBe(false);
    });

    test('isFutureDate returns true for future date', () => {
        let dt1 = new Date('2016-01-01');
        let dt2 = new Date('2500-01-01');
        let currDt = DateUtil.currentDate();
        expect(DateUtil.isFutureDate(dt1)).toBe(false);
        expect(DateUtil.isFutureDate(dt2)).toBe(true);
        expect(DateUtil.isFutureDate(currDt)).toBe(false);
    });

    test('isCurrentDate returns true for future date', () => {
        let dt1 = new Date('2016-01-01');
        let dt2 = new Date('2500-01-01');
        let currDt = DateUtil.currentDate();
        expect(DateUtil.isCurrentDate(dt1)).toBe(false);
        expect(DateUtil.isCurrentDate(dt2)).toBe(false);
        expect(DateUtil.isCurrentDate(currDt)).toBe(true);
    });
});
