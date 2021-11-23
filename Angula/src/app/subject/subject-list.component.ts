import { Component, OnInit } from '@angular/core';

import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../base-list.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['../list.css']
})
export class SubjectListComponent  extends BaseListCtl {

  rol=[{Id:"",Name:"Select Your College"}];
  // <option *ngFor="let n of rol"[value]="n.id" disabled selected hidden>{{n.Name}}</option>

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super( locator.endpoints.SUBJECT, locator, route);
  }

}