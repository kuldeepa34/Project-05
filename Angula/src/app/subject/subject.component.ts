import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent extends BaseCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.SUBJECT, locator, route);
  }
  year=['1 Year','2 Year','3 Year','4 Year','5 Year'];
  Sel=[{Id:"",Name:"Select Semester"}];

  stu=[{Id:"",Name:"Select Course"}];

  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    flag = flag && validator.isNotNullObject(form.subjectName);
    flag = flag && validator.isNotNullObject(form.subjectDescription);
    flag = flag && validator.isNotNullObject(form.courseName);
    return flag;
  }

  populateForm(form, data) {
    form.id = data.id;
    form.subjectName = data.subjectName;
    form.subjectDescription = data.subjectDescription;
    form.courseId = data.courseId;
 
  }

  
}
