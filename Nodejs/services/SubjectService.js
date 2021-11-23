var Subject = require("../bean/Subject");
var BaseService = require("./BaseService");

class SubjectService extends BaseService {

    /**
     * Finds subject by primary key id
     * returns Subject object
     */

    /**
    * Finds record by primary key id
    */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_subject WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new Subject(), callback);
    };

    /**
    * Searches and returns list. Applies pagination as well.
     * 
     * @param {*} subject 
     * @param {*} callback 
     */
    search(subject, pageNo, callback, ctx) {

        var sql = "SELECT * FROM st_subject where 1=1 ";
        if (subject.courseId) {
            sql += " and COURSE_ID = '" + subject.courseId + "'";
        } 
        if (subject.courseName) {
            sql += " and COURSE_NAME like '" + subject.courseName + "%'";
        }
        if (subject.subjectName) {
            sql += " and SUBJECT_NAME like  '" + subject.subjectName + "%'";
        }
        if (subject.subjectDescription) {
            sql += "and SUBJECT_DESCRIPTION like '" + subject.subjectDescription + "%'";
        }
        if (subject.couresName) {
            sql += "and COURSE_NAME like '" + subject.couresName + "%'";
        }
        

        super.executeSQLForList(sql, { "pageNo": pageNo }, new Subject(), callback);

    }

    /**
     * Adds a subject and returns primary key
     * 
     * @param {*} subject 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(subject, callback, ctx) {
        var sql = "INSERT INTO st_subject (CREATED_DATETIME,MODIFIED_DATETIME,SUBJECT_NAME,SUBJECT_DESCRIPTION,COURSE_NAME) "
            + " VALUES (NOW(),NOW(),?,?,?)";
        var params = [subject.subjectName,subject.subjectDescription,subject.courseName];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Updates a subject 
     * @param {*} subject 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(subject, callback, ctx) {
        var sql = "UPDATE st_subject SET  MODIFIED_DATETIME = NOW(),SUBJECT_NAME=?,SUBJECT_DESCRIPTION=?,COURSE_NAME=?  WHERE ID=?"
        var params = [subject.subjectName,subject.subjectDescription, subject.couresName, subject.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }

    /**
     * Delete a subject and return deleted bean
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        super.delete(id, 'st_subject', callback, ctx);
    }
}

//Export subject service
module.exports = SubjectService;

