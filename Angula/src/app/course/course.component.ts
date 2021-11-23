import { Component, OnInit } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent extends BaseCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.COURSE, locator, route);
  }
  year=['1 Year','2 Year','3 Year','4 Year','5 Year'];
  Sel=[{Id:"",Name:"Select Year"}];


  validate() {
    return this.validateForm(this.form.data);
  }

  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    flag = flag && validator.isNotNullObject(form.name);
    flag = flag && validator.isNotNullObject(form.description);
    return flag;
  }

  populateForm(form, data) {
    form.id = data.id;
    form.name = data.name;
    form.description = data.description;
    form.duration = data.state;
    
    console.log('Populated Form', form);
  }


}
