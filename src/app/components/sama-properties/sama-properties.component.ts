import { SamaProperty } from './../../models/sama-porperties.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sama-properties',
  templateUrl: './sama-properties.component.html',
  styleUrls: ['./sama-properties.component.css']
})
export class SamaPropertiesComponent implements OnInit {

  rootUrl = "";

  sama_Entity_Name_placeholder;
  sama_Entity_City_placeholder;
  sama_Entity_Phone_placeholder;
  sama_Entity_Type_placeholder;
  sama_Entity_Branch_placeholder;
  sama_Reporting_Name_placeholder;
  sama_Reporting_Address_placeholder;
  sama_Reporting_Phone_placeholder;


  sama_result_props :SamaProperty [];

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private http:HttpClient,private translate:TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);

    this.rootUrl = environment.ipAddress;
   }

  ngOnInit() {

    this.getPropsValues().subscribe(data=>{
      this.sama_result_props =data;

      console.log(data)

      this.sama_Entity_Name_placeholder = data[0].propertyValue?data[0].propertyValue:'Entity Name';
      this.sama_Entity_City_placeholder = data[1].propertyValue?data[1].propertyValue:'Entity City';
      this.sama_Entity_Phone_placeholder = data[2].propertyValue?data[2].propertyValue:'Entity Phone Number';
      this.sama_Entity_Type_placeholder = data[3].propertyValue?data[3].propertyValue:'Entity Type';
      this.sama_Entity_Branch_placeholder = data[4].propertyValue?data[4].propertyValue:'Entity Branch';
      this.sama_Reporting_Name_placeholder = data[5].propertyValue?data[5].propertyValue:'Reporting Name';
      this.sama_Reporting_Address_placeholder = data[6].propertyValue?data[6].propertyValue:'Reporting Address';
      this.sama_Reporting_Phone_placeholder = data[7].propertyValue?data[7].propertyValue:'Reporting Phone'

    },error=>{
      if(this.translate.getDefaultLang() == 'en')
        this.toastr.error('Operation fail!', 'Oops!')
      else 
        this.toastr.error('هناك خطأ, تأكد من اتصالك بالانترنت او السيرفر ', 'Oops!');
    })
  }

  getPropsValues(){
    let url = this.rootUrl+"/report/samaprops";
    return this.http.get<SamaProperty[]>(url);
  }

  updateProps(Form_){
    let url = this.rootUrl+"/report/savesamaprops";
    
    const formData = new FormData();
    formData.append("sama_Entity_Name", Form_.sama_Entity_Name?Form_.sama_Entity_Name:this.sama_Entity_Name_placeholder);
    formData.append("sama_Entity_City", Form_.sama_Entity_City?Form_.sama_Entity_City:this.sama_Entity_City_placeholder);
    formData.append("sama_Entity_Phone", Form_.sama_Entity_Phone?Form_.sama_Entity_Phone:this.sama_Entity_Phone_placeholder);
    formData.append("sama_Entity_Type", Form_.sama_Entity_Type?Form_.sama_Entity_Type:this.sama_Entity_Type_placeholder);
    formData.append("sama_Entity_Branch", Form_.sama_Entity_Branch?Form_.sama_Entity_Branch:this.sama_Entity_Branch_placeholder);
    formData.append("sama_Reporting_Name", Form_.sama_Reporting_Name?Form_.sama_Reporting_Name:this.sama_Reporting_Name_placeholder);
    formData.append("sama_Reporting_Address", Form_.sama_Reporting_Address?Form_.sama_Reporting_Address:this.sama_Reporting_Address_placeholder);
    formData.append("sama_Reporting_Phone", Form_.sama_Reporting_Phone?Form_.sama_Reporting_Phone:this.sama_Reporting_Phone_placeholder);

    return this.http.post(url,formData).subscribe(data=>{
      if(this.translate.getDefaultLang() == 'en')
        this.toastr.success('Values Updated Successfully','Success!')
      else 
        this.toastr.success('تم تحديث البيانات الخاصة بتقرير سما','تمت العملية بنجاح')
    },
  error=>{
    if(this.translate.getDefaultLang() == 'en')
      this.toastr.error('Operation fail!', 'Oops!')
    else 
      this.toastr.error('هناك خطأ, تأكد من اتصالك بالانترنت او السيرفر ', 'Oops!');
  })
  }

}
