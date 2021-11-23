var BaseCtl = require("../controller/BaseCtl");
var Marksheet = require("../bean/Marksheet");
var ServiceLocator = require("../services/ServiceLocator");
var Response = require("../bean/Response");

/**
 * Contains Marksheet REST APIs
 */

class MarksheetCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getMarksheetService();
    }

    /**
     * Returns preload data. 
     * 
     * @param {*} request
     * @param {*} response
     */
    preload(request, response) {
        console.log('Marksheet preload');
        var stdService = ServiceLocator.getStudentService();
        stdService.search('', null, function (err, result) {
            var res = {};
            res.studentList = result.list;
            var res = new Response(err, res);
            response.json(res)
        });
        
    };


    meritList(request,response){
        this.service.meritList(function (err,result)
        {
            var res=new Response(err,result);
            response.json(res)
        })
        
    };
    getMarksheet(request,response){
        this.service.getMarksheet(request.body.rollNo,function(err,result)
            {
                var res =new Response(err,result);
                response.json(res)
            })
    };

    

    /**     
     * Returns Marksheet bean populated from request parameters.
     */
    getBean(request) {
        var marksheet = new Marksheet();
        marksheet.populateRequest(request.body);
        return marksheet;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = MarksheetCtl;
