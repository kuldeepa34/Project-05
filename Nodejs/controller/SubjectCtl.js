var BaseCtl = require("./BaseCtl");
var Subject = require("../bean/Subject");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require("../bean/Response");

/**
 * Contains Subject REST APIs
 */
class SubjectCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getSubjectService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
     preload(request, response) {
        var couService = ServiceLocator.getCourseService();
        couService.search('', null, function (err, result) {
            var res = {};
            res.courseList = result.list;
            var res = new Response(err, res);
            response.json(res)
        });
    };

    /**
     * Returns Subject bean populated from request parameters. 
     */
    getBean(request) {
        var subject = new Subject();
        subject.populateRequest(request.body);
        return subject;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = SubjectCtl;
