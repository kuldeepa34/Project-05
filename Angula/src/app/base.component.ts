import { OnInit } from '@angular/core';
import { ServiceLocatorService } from './service-locator.service';
import {EndpointServiceService} from './endpoint-service.service';
import { ActivatedRoute } from '@angular/router';

export class BaseCtl implements OnInit {

  /**
   * Initialize services
   *
   * @param serviceLocator
   * @param route
   */
  constructor(public endpoint: EndpointServiceService, public serviceLocator: ServiceLocatorService, public route: ActivatedRoute) {

    const _self = this;

    _self.initApi(endpoint);

    /**
     * Get primary key from path variale
     */
    serviceLocator.getPathVariable(route, function(params) {
      _self.form.data.id = params.id;
      console.log('I GOT ID', _self.form.data.id);
    });
  }

  public api = {
    endpoint: null,
    get: null,
    save: null,
    search: null,
    delete: null,
    preload: null,
    list:null,

    
  };

  /**
   * Form contains preload data, error/sucess message
   */
  public form = {
    error: null, // error
    message: null, // error or success message
    preload: [], // preload data
    data: { id: null,}, // form data
    inputerror: {}, // form input error messages
    searchParams: {}, // search form
    searchMessage: null, // search result message
    list: [], // search list
    pageNo : 0,
    length : 0,
    pageSize :0,

    
  };

  initApi(ep) {
    this.api.endpoint = ep;
    this.api.get = ep + '/get';
    this.api.save = ep + '/save';
    this.api.search = ep + '/search';
    this.api.delete = ep + '/delete';
    this.api.preload = ep + '/preload';
    this.api.list = ep +'/list';
    console.log('API', this.api);
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.preload();
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
  }

  /**
   * Loded preload data
   */
  preload() {
    const _self = this;
    this.serviceLocator.httpService.get(_self.api.preload, function(res) {
      if (res.success) {
        _self.form.preload = res.result;
      } else {
        _self.form.error = true;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
      console.log(_self.form.preload+'???????????????????????????????????????????????????????????????????')
    });
  }


  // validate() {
  //   return this.validateForm(this.form.data);
  // }

  // /**
  //  * Override by childs
  //  *
  //  * @param form
  //  */
  // validateForm(form) {
  // }

  /**
   * Searhs records 
   */
  // search() {
  //   const _self = this;
  //   console.log('Search Form', _self.form.searchParams);
  //   this.serviceLocator.httpService.post(_self.api.search + '/' + _self.form.pageNo, _self.form.searchParams, function(res) {

  //     if (res.success) {
  //       _self.form.list = res.result.data;
  //       console.log(_self.form.list+"kkkkkk..........")
  //       if (_self.form.list.length == 0) {
  //          _self.form.message = 'No record found';
  //         _self.form.error = true;
  //       }
  //       console.log('List Size', _self.form.list.length );
  //     } else {
  //       _self.form.error = false;
  //       _self.form.message = res.result.message;
  //     }
  //     console.log('FORM', _self.form);
  //   });
  // }
  search() {
    console.log("search start")
    var _self = this;
    console.log("Search Form", _self.form.searchParams);
    

    _self.form.searchParams["pageNo"] =_self.form.pageNo;



    this.serviceLocator.httpService.post(_self.api.search ,_self.form.searchParams,   function (res) {
    console.log('1')  
      if(res.success){
        _self.form.list = res.result.list;
       
        _self.form.pageNo = res.result.pageNo;
        console.log( _self.form.pageNo+"dgfagfsgfhdsjfgkjjfffffffffffffffffffffffffffffffffffffff")
         _self.form.length = res.result.length;
         
        console.log(res.result.list+'list naa')

        console.log(_self.form.list+ "dhdjdhfj")
        
        if(_self.form.length == 0){
          _self.form.message = "No record found";
          _self.form.error = true;
        }
        console.log("List Size",_self.form.list.length );
      }else{
        _self.form.error = false;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
    });
  }
  /**
   * Contains display logic. It fetches data from database for the primary key
   */
  display() {

    const _self = this;

    this.serviceLocator.httpService.get(_self.api.get + '/' + _self.form.data.id, function(res) {
      if (res.success) {
        _self.populateForm(_self.form.data, res.result);
      } else {
        _self.form.error = true;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
    });
  }

  /**
   * Populate HTML form data
   * Overridden by child classes.
   *
   * @param form
   * @param data
   */
  populateForm(form, data) {
    form.id = data.id;
  }

  /**
   * Contains submit logic. It saves data
   */
  submit() {
    const _self = this;

    this.serviceLocator.httpService.post(this.api.save, this.form.data, function(res) {
      _self.form.message = '';
      _self.form.inputerror = {};

      if (res.success) {
        _self.form.message = 'Data is saved';
      } else {
        _self.form.error = true;
        _self.form.inputerror = res.result.inputerror;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
    });
  }

  delete(id, callback?) {
    const _self = this;
    this.serviceLocator.httpService.get(_self.api.delete + '/' + id, function(res) {
      if (res.success) {
        _self.search();
        _self.form.message = 'Data is deleted';
        if (callback) {
          console.log('callingcallback');
          callback();
        }
      } else {
        _self.form.error = true;
        _self.form.message = res.result.message;
      }
    });
  }

  /**
   * Forward to page
   * @param page
   */

  forward(page) {
    this.serviceLocator.forward(page);
  }

}
