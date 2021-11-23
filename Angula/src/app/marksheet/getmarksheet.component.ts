import { Component, OnInit } from "@angular/core";
import { EndpointServiceService } from "../endpoint-service.service";
import { HttpServiceService } from "../http-service.service";

@Component({
    selector:'app-get-marksheet',
    templateUrl:'getmarksheet.component.html'
})
export class GetmarksheetComponent implements OnInit{
    flag: boolean;
    ngOnInit() {
    }
    constructor(private httpService : HttpServiceService,private endpoint : EndpointServiceService){

    }
    public form={
        error:false,
        message:null,
        data:{},
        searchParams : {},
        inputerror : {}
    }
    submit(){
        var _self = this;
        this.flag = false;
        this.httpService.post(_self.endpoint.MARKSHEET+"/getMarksheet",this.form,function(res){
            if(res.success){
                _self.flag = true;
                _self.form.data = res.result;
            }else {
                _self.flag = false;
                _self.form.error=true;
                _self.form.inputerror = res.inputerror
                
            }

        })
    }
    populateForm(form,data){
        
    }
    reset(){
        this.form.data = {}
        this.flag = false;
        this.form.error=false;
        this.form.message=null;
        
    }
    
}