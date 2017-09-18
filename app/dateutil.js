import { TaskToken } from './tasktoken';
import { TokenTypes } from './tokentypes';

export const DateUtil = {
    dateRegex: /^\d{4}-\d{1,2}-\d{1,2}$/,
    /*
     * returns current javascript date without time part
     */
    currentDate: function () {
        let dt = new Date();
        let dtStr = dt.toISOString().split('T')[0] + 'T00:00:00Z'; //adding time part to prevent timezone interference
        return new Date(dtStr);
    },
    /*
     * returns current javascript date without time part as TaskToken
     */
    currentDateToken: function () {
        let dt = new Date();
        let dtStr = dt.toISOString().split('T')[0];
        return new TaskToken(dtStr, TokenTypes.CREATION_DATE);
    },
    /*
     * @param1: javascript date object which will be checked
     * returns true if the passed date is past date
     */
    isPastDate: function (inDt) {
        let currDate = this.currentDate();
        return currDate - inDt > 0;
    },
    /*
     * @param1: javascript date object which will be checked
     * returns true if the passed date is future date
     */
    isFutureDate: function (inDt) {
        let currDate = this.currentDate();
        return currDate - inDt < 0;
    },
    /*
     * @param1: javascript date object which will be checked
     * returns true if the passed date is current date
     * the passed date cannot have time part
     */
    isCurrentDate: function (inDt) {
        let currDate = this.currentDate();
        return currDate - inDt === 0;
    },
    /*
     * @param1: string of format yyyy-mm-dd
     * returns javascript date object without time part
     * returns null if string format is not matched
     */
    parseDate: function (inDtStr) {
        if (this.dateRegex.test(inDtStr)) {
            let dtStr = inDtStr + 'T00:00:00';
            let dt = new Date(dtStr);
            if (dt.toString() === "Invalid Date")
                return null;
            else return dt;
        }
        return null;
    }
}
