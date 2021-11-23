class DataValidator {

    static isMobileNo(str) {
        
        var patt = new RegExp('[0-9]');
        return patt.test(str);
    }
    static isEmail(str) {
        var patt = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        return patt.test(str);
    }
    static isFirstName(str) {
        var patt = new RegExp('[.a-zA-Z]');
        return patt.test(str);
    }
    static isName(str) {
        var patt = new RegExp("[a-zA-Z]");
        return patt.test(str);
    }
    static isPassword(str) {
        var patt = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
        return patt.test(str);
    }
    static isRollNo(str) {
        var patt = new RegExp("[0-9]{2}[a-zA-Z]{2}[0-9]{2}");
        return patt.test(str);
    }
    static isNumber(str) {
        var patt = new RegExp("[0-9]");
        return patt.test(str);
    }

    static isMarks(str) {

        if (this.isNumber(str)) {
            if (str >= 0 && str <= 100) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }




}
module.exports = DataValidator;