var CollegeService = require("./CollegeService");
var MarksheetService = require("./MarksheetService");
var RoleService = require("./RoleService");
var StudentService = require("./StudentService");
var UserService = require("./UserService");
var SubjectService = require("./SubjectService");
var CourseService = require("./CourseService");
var FacultyService = require("./FacultyService");
var TimetableService = require("./TimetableService");

/**
 * Locate service 
 */
class ServiceLocator {

  constructor() {
    this.db = 'MySQL';
  }
  static getCollegeService() {
    return new CollegeService();
  }
  static getMarksheetService() {
    return new MarksheetService();
  }
  static getRoleService() {
    return new RoleService();
  }
  static getStudentService() {
    return new StudentService();
  }
  static getUserService() {
    return new UserService();
  }
  static getSubjectService() {
    return new SubjectService();
  }
  static getCourseService() {
    return new CourseService();
  }
  static getFacultyService() {
    return new FacultyService();
  }
  static getTimetableService() {
    return new TimetableService();
  }



}
module.exports = ServiceLocator;
