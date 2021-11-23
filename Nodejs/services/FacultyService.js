var Faculty = require("../bean/Faculty");
var BaseService = require("./BaseService");

class FacultyService extends BaseService {

    /**
     * Finds faculty by primary key id
     * returns faculty object
     */

    /**
    * Finds record by primary key id
    */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_faculty WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new Faculty(), callback);
    };

    /**
    * Searches and returns list. Applies pagination as well.
     * 
     * @param {*} faculty 
     * @param {*} callback 
     */
    search(faculty, pageNo, callback, ctx) {

        var sql = "SELECT * FROM st_faculty where 1=1 ";

        if (faculty.subjectName) {
            sql += " and SUBJECT_NAME like  '" + faculty.subjectName + "%'";
        }
        if (faculty.collegeName) {
            sql += "and COLLEGE_NAME like '" + faculty.collegeName + "%'";
        }
        if (faculty.couresName) {
            sql += "and COURSE_NAME like '" + faculty.couresName + "%'";
        }
        

        super.executeSQLForList(sql, { "pageNo": pageNo }, new Faculty(), callback);

    }

    /**
     * Adds a faculty and returns primary key
     * 
     * @param {*} faculty 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(faculty, callback, ctx) {
        var sql = "INSERT INTO st_faculty (CREATED_DATETIME,MODIFIED_DATETIME,FIRST_NAME,LAST_NAME,EMAIL,PASSWORD,MOBILE_NO,ADDRESS,GENDER,COLLEGE_NAME,COURSE_NAME,SUBJECT_NAME,DOB) "
            + " VALUES (NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?)";
        var params = [faculty.firstName,faculty.lastName,faculty.email,faculty.password,faculty.mobileNo,faculty.address,faculty.gender,faculty.collegeName,faculty.courseName,faculty.subjectName,faculty.dob];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Updates a faculty 
     * @param {*} faculty 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(faculty, callback, ctx) {
        var sql = "UPDATE st_faculty SET  MODIFIED_DATETIME = NOW(),FIRST_NAME=?,LAST_NAME=?,EMAIL=?,PASSWORD=?,MOBILE_NO=?,ADDRESS=?,GENDER=?,COLLEGE_NAME=?,COURSE_NAME=?,SUBJECT_NAME=?,DOB=?  WHERE ID=?"
        var params = [faculty.firstName,faculty.lastName,faculty.email,faculty.password,faculty.mobileNo,faculty.address,faculty.gender,faculty.collegeName,faculty.courseName,faculty.subjectName,faculty.dob];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }

    /**
     * Delete a faculty and return deleted bean
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        super.delete(id, 'st_faculty', callback, ctx);
    }
}

//Export faculty service
module.exports = FacultyService;

