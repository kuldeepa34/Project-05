var BaseBean = require('../bean/BaseBean');

class Subject extends BaseBean{
    constructor(){
        super();
        this.subjectName = '';
        this.subjectDescription = '';
        this.courseName = '';    
    };
 /**
     * Set populateResult into bean.
     * @param {*} res 
     */
    
 populateResult(res) {
 	    this.id = res.ID;
        this.subjectName = res.SUBJECT_NAME;
        this.subjectDescription = res.SUBJECT_DESCRIPTION;
        this.courseName = res.COURSE_NAME;
        this.createdBy = res.CREATED_BY;
        this.modifiedBy = res.MODIFIED_BY;
        this.createdDateTime = res.CREATED_DATETIME;
        this.modifiedDateTime = res.MODIFIED_DATETIME;
 }
   /**
     * Get request data from body.
     * @param {*} body 
     */
    populateRequest(body) {
        if (body.id) {
            this.id = body.id;
        }
        if (body.subjectName) {
            this.subjectName = body.subjectName;
        }
        if (body.subjectDescription) {
            this.subjectDescription = body.subjectDescription;
        }
        if (body.courseName) {
            this.courseName = body.courseName;
        }        
        if (body.size) {
            this.size = body.size;
        }
        if (body.pageNo) {
            this.pageNo = body.pageNo;
        }
    }
}

module.exports = Subject;