var BaseCtl = require("./BaseCtl");
var Course = require("../bean/Course");
var ServiceLocator = require("../services/ServiceLocator");

/**
 * Contains Course REST APIs
 */
class CourseCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getCourseService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        
    };

    /**
     * Returns Course bean populated from request parameters. 
     */
    getBean(request) {
        var course = new Course();
        course.populateRequest(request.body);
        return course;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = CourseCtl;
