var BaseCtl = require("./BaseCtl");
var Timetable = require("../bean/Timetable");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require("../bean/Response");
/**
 * Contains Timetable REST APIs
 */
class TimetableCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getTimetableService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
     preload(request, response) {
        var collegeService = ServiceLocator.getCollegeService();
        var courseService = ServiceLocator.getCourseService();
        var subjectService = ServiceLocator.getSubjectService();
        var result = {}
        collegeService.search('', null, function (err, college) {
            if (!err) {
                result.collegeList = college.list;
                courseService.search('', null, function (err, course) {
                    if (!err) {
                        result.courseList = course.list;
                        subjectService.search('', null, function (err, subject) {
                            if (!err) {
                                result.subjectList = subject.list;
                                var res = new Response(err,result);
                                response.json(res);
                            }
                        });
                    }
                });
            }
        });
    };

    /**
     * Returns Timetable bean populated from request parameters. 
     */
    getBean(request) {
        var timetable = new Timetable();
        timetable.populateRequest(request.body);
        return timetable;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = TimetableCtl;
