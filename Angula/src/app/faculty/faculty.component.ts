
import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent extends BaseCtl  {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.FACULTY, locator, route);
  }

  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    flag = flag && validator.isNotNullObject(form.firstName);
    flag = flag && validator.isNotNullObject(form.lastName);
    flag = flag && validator.isNotNullObject(form.mobileNo);
    return flag;
  }

  populateForm(form, data) {
    form.id = data.id;
    form.collegeId = data.collegeId;
    form.courseId = data.courseId;
    form.subjectId = data.subjectId;
    form.firstName = data.firstName;
    form.lastName = data.lastName;
    form.email  = data.email;
    form.password = data.password;
    form.gender = data.gender;
    form.mobileNo = data.mobileNo;
    form.dob = data.dob;
    form.address = data.address;
  }

  
}