import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent  extends BaseCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.TIMETABLE, locator, route);
  }
  semester=['1st Sem','2nd Sem','3rd Sem','4th Sem','5th Sem','6th Sem'];
  Sel=[{Id:"",Name:"Select Semester"}];
  et=[{Id:"",Name:"Select Exam Time"}];
  cou=[{Id:"",Name:"Select  Course"}];
  stu=[{Id:"",Name:"Select  Subject"}];

  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    flag = flag && validator.isNotNullObject(form.examTime);
    flag = flag && validator.isNotNullObject(form.examDate);
    flag = flag && validator.isNotNullObject(form.subjectName);
    flag = flag && validator.isNotNullObject(form.courseName);
    flag = flag && validator.isNotNullObject(form.semester);
    return flag;
  }

  populateForm(form, data) {
    form.id = data.id;
    form.examTime = data.examTime;
    form.examDate = data.examDate;
    form.subjectName = data.subjectName;
    form.courseName = data.courseName;
    form.semester = data.semester;
  }

  
}
