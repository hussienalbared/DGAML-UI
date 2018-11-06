import { Key_ValueHelper } from './../../../models/Key_ValueHelper.model';
import { ScenarioParameter } from './../../../models/ScenarioParameter.model';
import { environment } from './../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-scenario-parameters',
  templateUrl: './scenario-parameters.component.html',
  styleUrls: ['./scenario-parameters.component.css']
})
export class ScenarioParametersComponent implements OnInit {

  m001_account_type_desc;
  m001_is_parties_related_desc;
  m001_percentage_desc;
  m001_event_name_desc;
  m001_transaction_event_ind_desc;
  m002_account_type_desc;
  mm002_amount_desc;
  m002_num_inst_desc;
  m002_cdi_code_desc;
  m002_num_days_desc;
  m003_account_type_desc;
  m003_credit_ind_desc;
  m003_percentage_desc;
  m003_cdi_code_desc;
  m005_account_type_desc;
  m005_percentage_desc;
  m005_num_days_desc;
  m005_transaction_type_desc;
  m005_credit_ind_desc;
  // m006_account_type_desc;
  // m006_amount_desc;
  // m006_num_days_desc;
  // m006_transaction_type_desc;
  // m006_credit_ind_desc;
  m007_account_type_desc;
  m007_amt_single_loan_desc;
  m007_num_days_desc;
  m007_total_amount_desc;
  m007_percentage_desc;
  m010_account_type_desc;
  m010_events_list_desc;
  m010_amount_desc;
  m010_cdi_code_desc;
  m010_num_days_desc;
  m010_num_events_desc;
  m016_account_type_desc;
  m016_num_days_desc;
  m020_number_desc;
  m020_auth_today_desc;
  m021_number_desc;
  m021_auth_today_desc;
  m022_amount_desc;
  m022_list_name_desc;
  m022_cdi_code_desc;
  m022_num_days_desc;
  m023_amount_desc;
  m023_pep_ind_desc;
  m023_num_days_desc;
  m023_cdi_code_desc;


  m001_percentage_placeholder;
  m002_amount_placeholder;
  m002_num_inst_placeholder;
  m002_num_days_placeholder;
  m003_percentage_placeholder;
  m005_percentage_placeholder;
  m005_num_days_placeholder;
  // m006_amount_placeholder;
  // m006_num_days_placeholder;
  m007_amt_single_loan_placeholder;
  m007_num_days_placeholder;
  m007_total_amount_placeholder;
  m007_percentage_placeholder;
  m010_amount_placeholder;
  m010_num_days_placeholder;
  m010_num_events_placeholder;
  m016_num_days_placeholder;
  m020_number_placeholder;
  m020_auth_today_placeholder;
  m021_number_placeholder;
  m021_auth_today_placeholder;
  m022_amount_placeholder;
  m022_list_name_placeholder;
  m022_num_days_placeholder;
  m023_amount_placeholder;
  m023_num_days_placeholder;
  m023_cdi_code_placeholder;;

  rootUrl = "";
  scenario_paramets_result : ScenarioParameter[];

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private http:HttpClient,private translate:TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.rootUrl = environment.projectName;
   }

   params: Key_ValueHelper[] =[];
   paramObj = <Key_ValueHelper>{};
   paramObj_ = <Key_ValueHelper>{};

   event_names: string[] = ['CHANGE BENEFICIARY','CHANGE OWNER'];

   cdi_code: string[] = ['Credit','Debit'] ;
   scnarios:string[] = ['AML001','AML002','AML003','AML005','AML007'];

   scnarios_n;

   ngOnInit() {

    this.paramObj.param_Name = "Personal"
    this.paramObj.param_Value = "P";
    this.params.push(this.paramObj);
    this.paramObj_.param_Name = "Company"
    this.paramObj_.param_Value = "C";
    this.params.push(this.paramObj_);

    this.getScenarioParameters().subscribe(data=>{
      this.scenario_paramets_result = data;
      console.log(data);

      this.setDataPlaceholder();

      this.setDataDesc();

    });
  }

  getScenarioParameters(){
    let url = this.rootUrl+"/aml/api/agp/getparams";
    return this.http.get<ScenarioParameter[]>(url);
  }

  setDataPlaceholder(){
    this.m001_percentage_placeholder = this.scenario_paramets_result[3].parm_Value?this.scenario_paramets_result[3].parm_Value:'';
    
    this.m002_amount_placeholder = this.scenario_paramets_result[7].parm_Value?this.scenario_paramets_result[7].parm_Value:'';
    this.m002_num_inst_placeholder = this.scenario_paramets_result[10].parm_Value?this.scenario_paramets_result[10].parm_Value:'';
    this.m002_num_days_placeholder = this.scenario_paramets_result[9].parm_Value?this.scenario_paramets_result[9].parm_Value:'';
    
    this.m003_percentage_placeholder = this.scenario_paramets_result[13].parm_Value?this.scenario_paramets_result[13].parm_Value:'';
    
    this.m005_percentage_placeholder = this.scenario_paramets_result[17].parm_Value?this.scenario_paramets_result[17].parm_Value:'';
    this.m005_num_days_placeholder = this.scenario_paramets_result[16].parm_Value?this.scenario_paramets_result[16].parm_Value:'';
    

    this.m007_amt_single_loan_placeholder = this.scenario_paramets_result[20].parm_Value?this.scenario_paramets_result[20].parm_Value:'';
    this.m007_num_days_placeholder = this.scenario_paramets_result[21].parm_Value?this.scenario_paramets_result[21].parm_Value:'';
    this.m007_total_amount_placeholder = this.scenario_paramets_result[11].parm_Value?this.scenario_paramets_result[23].parm_Value:'';
    this.m007_percentage_placeholder = this.scenario_paramets_result[22].parm_Value?this.scenario_paramets_result[22].parm_Value:'';
    
    this.m010_amount_placeholder = this.scenario_paramets_result[25].parm_Value?this.scenario_paramets_result[25].parm_Value:'';
    this.m010_num_days_placeholder = this.scenario_paramets_result[28].parm_Value?this.scenario_paramets_result[28].parm_Value:'';
    this.m010_num_events_placeholder = this.scenario_paramets_result[29].parm_Value?this.scenario_paramets_result[29].parm_Value:'';
    
    this.m016_num_days_placeholder = this.scenario_paramets_result[31].parm_Value?this.scenario_paramets_result[31].parm_Value:'';
    
    this.m020_number_placeholder = this.scenario_paramets_result[34].parm_Value?this.scenario_paramets_result[34].parm_Value:'';
    this.m020_auth_today_placeholder = this.scenario_paramets_result[33].parm_Value?this.scenario_paramets_result[33].parm_Value:'';
    
    this.m021_number_placeholder = this.scenario_paramets_result[36].parm_Value?this.scenario_paramets_result[36].parm_Value:'';
    this.m021_auth_today_placeholder = this.scenario_paramets_result[35].parm_Value?this.scenario_paramets_result[35].parm_Value:'';
    
    this.m022_amount_placeholder = this.scenario_paramets_result[39].parm_Value?this.scenario_paramets_result[39].parm_Value:'';
    this.m022_list_name_placeholder = this.scenario_paramets_result[41].parm_Value?this.scenario_paramets_result[41].parm_Value:'';
    this.m022_num_days_placeholder = this.scenario_paramets_result[42].parm_Value?this.scenario_paramets_result[42].parm_Value:'';
    
    this.m023_amount_placeholder = this.scenario_paramets_result[43].parm_Value?this.scenario_paramets_result[43].parm_Value:'';
    this.m023_num_days_placeholder = this.scenario_paramets_result[45].parm_Value?this.scenario_paramets_result[45].parm_Value:'';
  }

  setDataDesc(){
    this.m001_is_parties_related_desc = this.scenario_paramets_result[2].parm_Desc?this.scenario_paramets_result[2].parm_Desc:'';
    this.m001_account_type_desc = this.scenario_paramets_result[0].parm_Desc?this.scenario_paramets_result[0].parm_Desc:'';
    this.m001_percentage_desc = this.scenario_paramets_result[3].parm_Desc?this.scenario_paramets_result[3].parm_Desc:'';
    this.m001_event_name_desc = this.scenario_paramets_result[1].parm_Desc?this.scenario_paramets_result[1].parm_Desc:'';
    this.m001_transaction_event_ind_desc = this.scenario_paramets_result[5].parm_Desc?this.scenario_paramets_result[5].parm_Desc:'';
    
    this.m002_account_type_desc = this.scenario_paramets_result[6].parm_Desc?this.scenario_paramets_result[6].parm_Desc:'';
    this.mm002_amount_desc = this.scenario_paramets_result[7].parm_Desc?this.scenario_paramets_result[7].parm_Desc:'';
    this.m002_num_inst_desc = this.scenario_paramets_result[10].parm_Desc?this.scenario_paramets_result[10].parm_Desc:'';
    this.m002_cdi_code_desc = this.scenario_paramets_result[8].parm_Desc?this.scenario_paramets_result[8].parm_Desc:'';
    this.m002_num_days_desc = this.scenario_paramets_result[9].parm_Desc?this.scenario_paramets_result[9].parm_Desc:'';
    
    this.m003_account_type_desc = this.scenario_paramets_result[11].parm_Desc?this.scenario_paramets_result[11].parm_Desc:'';
    this.m003_percentage_desc = this.scenario_paramets_result[13].parm_Desc?this.scenario_paramets_result[13].parm_Desc:'';
    this.m003_credit_ind_desc = this.scenario_paramets_result[12].parm_Desc?this.scenario_paramets_result[12].parm_Desc:'';
    
    this.m005_account_type_desc = this.scenario_paramets_result[14].parm_Desc?this.scenario_paramets_result[14].parm_Desc:'';
    this.m005_percentage_desc = this.scenario_paramets_result[17].parm_Desc?this.scenario_paramets_result[17].parm_Desc:'';
    this.m005_num_days_desc = this.scenario_paramets_result[16].parm_Desc?this.scenario_paramets_result[16].parm_Desc:'';
    this.m005_transaction_type_desc = this.scenario_paramets_result[18].parm_Desc?this.scenario_paramets_result[18].parm_Desc:'';
    this.m005_credit_ind_desc = this.scenario_paramets_result[15].parm_Desc?this.scenario_paramets_result[15].parm_Desc:'';
    // this.m006_account_type_desc = this.scenario_paramets_result[18].parm_Desc?this.scenario_paramets_result[18].parm_Desc:'';
    // this.m006_amount_desc = this.scenario_paramets_result[19].parm_Desc?this.scenario_paramets_result[19].parm_Desc:'';
    // this.m006_num_days_desc = this.scenario_paramets_result[20].parm_Desc?this.scenario_paramets_result[20].parm_Desc:'';
    // this.m006_transaction_type_desc = this.scenario_paramets_result[21].parm_Desc?this.scenario_paramets_result[21].parm_Desc:'';
    // this.m006_credit_ind_desc = this.scenario_paramets_result[22].parm_Desc?this.scenario_paramets_result[22].parm_Desc:'';
    this.m007_account_type_desc = this.scenario_paramets_result[19].parm_Desc?this.scenario_paramets_result[19].parm_Desc:'';
    this.m007_amt_single_loan_desc = this.scenario_paramets_result[20].parm_Desc?this.scenario_paramets_result[20].parm_Desc:'';
    this.m007_num_days_desc = this.scenario_paramets_result[21].parm_Desc?this.scenario_paramets_result[21].parm_Desc:'';
    this.m007_total_amount_desc = this.scenario_paramets_result[22].parm_Desc?this.scenario_paramets_result[22].parm_Desc:'';
    this.m007_percentage_desc = this.scenario_paramets_result[22].parm_Desc?this.scenario_paramets_result[22].parm_Desc:'';
    
    
    this.m010_account_type_desc = this.scenario_paramets_result[24].parm_Desc?this.scenario_paramets_result[24].parm_Desc:'';
    this.m010_events_list_desc = this.scenario_paramets_result[27].parm_Desc?this.scenario_paramets_result[27].parm_Desc:'';
    this.m010_amount_desc = this.scenario_paramets_result[25].parm_Desc?this.scenario_paramets_result[25].parm_Desc:'';
    this.m010_cdi_code_desc = this.scenario_paramets_result[26].parm_Desc?this.scenario_paramets_result[26].parm_Desc:'';
    this.m010_num_days_desc = this.scenario_paramets_result[28].parm_Desc?this.scenario_paramets_result[28].parm_Desc:'';
    this.m010_num_events_desc = this.scenario_paramets_result[29].parm_Desc?this.scenario_paramets_result[29].parm_Desc:'';
    
    this.m016_account_type_desc = this.scenario_paramets_result[30].parm_Desc?this.scenario_paramets_result[30].parm_Desc:'';
    this.m016_num_days_desc = this.scenario_paramets_result[31].parm_Desc?this.scenario_paramets_result[31].parm_Desc:'';
    
    this.m020_number_desc = this.scenario_paramets_result[34].parm_Desc?this.scenario_paramets_result[34].parm_Desc:'';
    this.m020_auth_today_desc = this.scenario_paramets_result[33].parm_Desc?this.scenario_paramets_result[33].parm_Desc:'';;
    
    this.m021_number_desc = this.scenario_paramets_result[36].parm_Desc?this.scenario_paramets_result[36].parm_Desc:'';;
    this.m021_auth_today_desc = this.scenario_paramets_result[35].parm_Desc?this.scenario_paramets_result[35].parm_Desc:'';;
    this.m022_amount_desc = this.scenario_paramets_result[39].parm_Desc?this.scenario_paramets_result[39].parm_Desc:'';;
    
    this.m022_list_name_desc = this.scenario_paramets_result[41].parm_Desc?this.scenario_paramets_result[41].parm_Desc:'';;
    this.m022_cdi_code_desc = this.scenario_paramets_result[40].parm_Desc?this.scenario_paramets_result[40].parm_Desc:'';;
    this.m022_num_days_desc = this.scenario_paramets_result[42].parm_Desc?this.scenario_paramets_result[42].parm_Desc:'';;
    
    this.m023_amount_desc = this.scenario_paramets_result[43].parm_Desc?this.scenario_paramets_result[43].parm_Desc:'';;
    this.m023_pep_ind_desc = this.scenario_paramets_result[46].parm_Desc?this.scenario_paramets_result[46].parm_Desc:'';;
    this.m023_num_days_desc = this.scenario_paramets_result[45].parm_Desc?this.scenario_paramets_result[45].parm_Desc:'';;
    this.m023_cdi_code_desc = this.scenario_paramets_result[44].parm_Desc?this.scenario_paramets_result[44].parm_Desc:'';
  }

  updateParameters(amlForm){
    console.log(amlForm)
    
    let arr:Key_ValueHelper[]=[];
    

    for(var x in amlForm){
      // console.log(amlForm[x])
      let p= <Key_ValueHelper>{};
      p.param_Name = x;
      p.param_Value = amlForm[x];

      arr.push(p);
    }
    console.log("*********")
    console.log(arr)
 
    // const formData = new FormData();
    // for (var i = 0; i < arr.length; i++) {
    //   formData.append("key_ValueHelper", new Blob( [ JSON.stringify( arr ) ], { type : 'application/json' }));
    // }

    let url = this.rootUrl+"/aml/api/agp/updateparam";
    // return this.http.post<Key_ValueHelper>(url,JSON.stringify(arr),httpOptions).subscribe(data=>{});
    return this.http.post<Key_ValueHelper>(url,JSON.stringify(amlForm)).subscribe(data=>{});
  }

  m001_account_type: string;


  runScenario(){
    console.log("runScenario()")
    console.log(this.scnarios_n)
    let url = this.rootUrl+"/aml/api/agp/dgamlRun";
    return this.http.post(url,this.scnarios_n).subscribe(data=>{});
  }

}
