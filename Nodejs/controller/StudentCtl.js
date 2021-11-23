var BaseCtl = require("../controller/BaseCtl");
var Student = require("../bean/Student");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require("../bean/Response");


/**
 * Contains Student REST APIs.
 */

class StudentCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getStudentService();
    }

    /**
     * Returns preload data.
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var clgService = ServiceLocator.getCollegeService();
        clgService.search('', null, function (err, result) {
            var res = {};
            res.collegeList = result.list;
            var res = new Response(err, res);
            response.json(res)
        });
    };



    // preload(request, response) {
    //     var clgService = ServiceLocator.getCollegeService();
    //     clgService.search('', null, function (err, result) {
            
    //         response.json(result.list)
    //     })
    // };

    /**
     * Return bean of Sudent controller.
     * @param {*} request 
     */
    getBean(request) {
        var student = new Student();
        student.populateRequest(request.body);
        return student;
    };

    /**
     * return service of Role controller.
     */
    getService() {
        return this.service;
    };
    validate(body,callback){
        var pass = true;
        var result = {};
        result.inputerror ={};
        if(!body.collegeId){
            result.inputerror.collegeId =" college name is required";
            pass =false
        }
        if(!body.firstName){
            result.inputerror.firstName =" firstname is required";
            pass =false
        }
        if(!body.lastName){
            result.inputerror.lastName ="lastName is required";
            pass =false
        }
         if(!body.dob){
            result.inputerror.dob ="dob is required";
            pass=false
        }
        if(!body.mobileNo){
            result.inputerror.mobileNo ="mobileNo is required";
            pass=false
        }
        if(!body.email){
            result.inputerror.email ="email  is required";
            pass=false
        }
        
        if(pass==false){
            callback(pass,result);
        }else{
            callback(pass);
        }

    }
}

module.exports = StudentCtl;