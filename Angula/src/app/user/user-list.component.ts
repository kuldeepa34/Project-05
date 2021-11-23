import { Component, OnInit } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../list.css']
})
export class UserListComponent extends BaseListCtl{ 
  rol=[{Id:"",Name:"Select  Role"}];  
  
  imageToShow: any;
    myKey = "";
  
  createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
     
     }, false);
  
     if (image) {
        reader.readAsDataURL(image);
     }
  }

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute,public httpClient:HttpClient ) {
    super(locator.endpoints.USER, locator, route);
  }
  getImage(id) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.form.data.id = id;
    console.log(this.form.data.id);
    
    this.httpClient.get('http://localhost:8080/User/profilePic/'+this.form.data.id, { responseType: 'blob' }).subscribe(data => {
      this.createImageFromBlob(data);
      this.myKey= this.form.data.id;
    }, error => {
      
      console.log(error);
    });
}
}
