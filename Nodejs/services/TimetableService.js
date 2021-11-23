var Timetable = require("../bean/Timetable");
var BaseService = require("./BaseService");

class TimetableService extends BaseService {

    /**
     * Finds Timetable by primary key id
     * returns Timetable object
     */

    /**
    * Finds record by primary key id
    */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_timetable WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new Timetable(), callback);
    };

    /**
    * Searches and returns list. Applies pagination as well.
     * 
     * @param {*} timetable 
     * @param {*} callback 
     */
    search(timetable, pageNo, callback, ctx) {

        var sql = "SELECT * FROM st_timetable where 1=1 ";

        if (timetable.subjectName) {
            sql += " and SUBJECT_NAME like  '" + timetable.subjectName + "%'";
        }
        if (timetable.semester) {
            sql += "and SEMESTER like '" + subject.semester + "%'";
        }
        if (timetable.couresName) {
            sql += "and COURSE_NAME like '" + timetable.couresName + "%'";
        }
        

        super.executeSQLForList(sql, { "pageNo": pageNo }, new Timetable(), callback);

    }

    /**
     * Adds a Timetable and returns primary key
     * 
     * @param {*} Timetable 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(timetable, callback, ctx) {
        var sql = "INSERT INTO st_timetable (CREATED_DATETIME,MODIFIED_DATETIME,EXAM_TIME,EXAM_DATE,SUBJECT_NAME,COURSE_NAME,SEMESTER) "
            + " VALUES (NOW(),NOW(),?,?,?,?,?)";
        var params = [timetable.examTime,timetable.examDate,timetable.subjectName,timetable.courseName,timetable.semester];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Updates a timetable 
     * @param {*} timetable 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(timetable, callback, ctx) {
        var sql = "UPDATE st_timetable SET  MODIFIED_DATETIME = NOW(),EXAM_TIME=?,EXAM_DATE=?,SUBJECT_NAME=?,COURSE_NAME=?,SEMESTER=?  WHERE ID=?"
        var params = [timetable.examTime,timetable.examDate,timetable.subjectName,timetable.courseName,timetable.semester];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }

    /**
     * Delete a timetable and return deleted bean
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        super.delete(id, 'st_timetable', callback, ctx);
    }
}

//Export timetable service
module.exports = TimetableService;

