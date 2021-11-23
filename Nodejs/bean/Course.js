var BaseBean = require('./BaseBean');

class Course extends BaseBean{
    constructor(){
        super();
        this.name = '';
        this.description = '';
        this.duration = '';
        };
 /**
     * Set populateResult into bean.
     * @param {*} res 
     */
    
 populateResult(res) {
     this.id = res.ID;
     this.name = res.COURSE_NAME;
     this.description = res.COURSE_DESCRIPTION;
     this.duration = res.COURSE_DURATION;
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
        if (body.name) {
            this.name = body.name;
        }
        if (body.description) {
            this.description = body.description;
        }
        if (body.duration) {
            this.duration = body.duration;
        }
        
        if (body.size) {
            this.size = body.size;
        }
        if (body.pageNo) {
            this.pageNo = body.pageNo;
        }
    }
}

module.exports = Course;