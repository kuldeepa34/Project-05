var Course = require("../bean/Course");
var BaseService = require("./BaseService");

class CourseService extends BaseService {

    /**
     * Finds course by primary key id
     * returns course object
     */

    /**
    * Finds record by primary key id
    */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_course WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new Course(), callback);
    };

    /**
    * Searches and returns list. Applies pagination as well.
     * 
     * @param {*} course 
     * @param {*} callback 
     */
    search(course, pageNo, callback, ctx) {

        var sql = "SELECT * FROM st_course where 1=1 ";

        if (course.name) {
            sql += " and NAME like  '" + course.name + "%'";
        }
        if (course.description) {
            sql += " and DESCRIPTION like  '" + course.description + "%'";
        }
        if (course.duration) {
            sql += " and DURATION like  '" + course.duration + "%'";
        }
        

        super.executeSQLForList(sql, { "pageNo": pageNo }, new Course(), callback);

    }

    /**
     * Adds a course and returns primary key
     * 
     * @param {*} course 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(course, callback, ctx) {
        var sql = "INSERT INTO st_course (CREATED_DATETIME,MODIFIED_DATETIME,NAME,DESCRIPTION,DURATION) "
            + " VALUES (NOW(),NOW(),?,?,?)";
        var params = [course.name,course.description,course.duration];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Updates a course 
     * @param {*} course 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(course, callback, ctx) {
        var sql = "UPDATE st_course SET  MODIFIED_DATETIME = NOW(),NAME=?,DESCRIPTION=?,DURATION=?  WHERE ID=?"
        var params = [course.name,course.description, course.duration, course.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }

    /**
     * Delete a course and return deleted bean
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        super.delete(id, 'st_course', callback, ctx);
    }
}

//Export course service
module.exports = CourseService;

