import { ScenarioParameter } from './../../../models/ScenarioParameter.model';
import { environment } from './../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
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
  m003_percentage_desc;
  m003_cdi_code_desc;
  m005_account_type_desc;
  m005_percentage_desc;
  m005_num_days_desc;
  m005_transaction_type_desc;
  m005_credit_ind_desc;
  m006_account_type_desc;
  m006_amount_desc;
  m006_num_days_desc;
  m006_transaction_type_desc;
  m006_credit_ind_desc;
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


  m001_percentage_placeholder;
  m002_amount_placeholder;
  m002_num_inst_placeholder;
  m002_num_days_placeholder;
  m003_percentage_placeholder;
  m005_percentage_placeholder;
  m005_num_days_placeholder;
  m006_amount_placeholder;
  m006_num_days_placeholder;
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

  rootUrl = "";
  scenario_paramets_result : ScenarioParameter[];

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private http:HttpClient,private translate:TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.rootUrl = environment.ipAddress;
   }

  ngOnInit() {
    this.getScenarioParameters().subscribe(data=>{
      this.scenario_paramets_result = data;
      console.log(data);

      this.setDataPlaceholder();

      this.setDataDesc();

    });
  }

  getScenarioParameters(){
    let url = this.rootUrl+"/scenario/parameters";
    return this.http.get<ScenarioParameter[]>(url);
  }

  setDataPlaceholder(){
    this.m001_percentage_placeholder = this.scenario_paramets_result[0].Parm_Value?this.scenario_paramets_result[0].Parm_Value:'';
    this.m002_amount_placeholder = this.scenario_paramets_result[1].Parm_Value?this.scenario_paramets_result[1].Parm_Value:'';
    this.m002_num_inst_placeholder = this.scenario_paramets_result[2].Parm_Value?this.scenario_paramets_result[2].Parm_Value:'';
    this.m002_num_days_placeholder = this.scenario_paramets_result[3].Parm_Value?this.scenario_paramets_result[3].Parm_Value:'';
    this.m003_percentage_placeholder = this.scenario_paramets_result[4].Parm_Value?this.scenario_paramets_result[4].Parm_Value:'';
    this.m005_percentage_placeholder = this.scenario_paramets_result[5].Parm_Value?this.scenario_paramets_result[5].Parm_Value:'';
    this.m005_num_days_placeholder = this.scenario_paramets_result[6].Parm_Value?this.scenario_paramets_result[6].Parm_Value:'';
    this.m006_amount_placeholder = this.scenario_paramets_result[7].Parm_Value?this.scenario_paramets_result[7].Parm_Value:'';
    this.m006_num_days_placeholder = this.scenario_paramets_result[8].Parm_Value?this.scenario_paramets_result[8].Parm_Value:'';
    this.m007_amt_single_loan_placeholder = this.scenario_paramets_result[9].Parm_Value?this.scenario_paramets_result[9].Parm_Value:'';
    this.m007_num_days_placeholder = this.scenario_paramets_result[10].Parm_Value?this.scenario_paramets_result[10].Parm_Value:'';
    this.m007_total_amount_placeholder = this.scenario_paramets_result[11].Parm_Value?this.scenario_paramets_result[11].Parm_Value:'';
    this.m007_percentage_placeholder = this.scenario_paramets_result[12].Parm_Value?this.scenario_paramets_result[12].Parm_Value:'';
    this.m010_amount_placeholder = this.scenario_paramets_result[13].Parm_Value?this.scenario_paramets_result[13].Parm_Value:'';
    this.m010_num_days_placeholder = this.scenario_paramets_result[14].Parm_Value?this.scenario_paramets_result[14].Parm_Value:'';
    this.m010_num_events_placeholder = this.scenario_paramets_result[15].Parm_Value?this.scenario_paramets_result[15].Parm_Value:'';
    this.m016_num_days_placeholder = this.scenario_paramets_result[16].Parm_Value?this.scenario_paramets_result[16].Parm_Value:'';
    this.m020_number_placeholder = this.scenario_paramets_result[17].Parm_Value?this.scenario_paramets_result[17].Parm_Value:'';
    this.m020_auth_today_placeholder = this.scenario_paramets_result[18].Parm_Value?this.scenario_paramets_result[18].Parm_Value:'';
    this.m021_number_placeholder = this.scenario_paramets_result[19].Parm_Value?this.scenario_paramets_result[19].Parm_Value:'';
    this.m021_auth_today_placeholder = this.scenario_paramets_result[20].Parm_Value?this.scenario_paramets_result[20].Parm_Value:'';
    this.m022_amount_placeholder = this.scenario_paramets_result[21].Parm_Value?this.scenario_paramets_result[21].Parm_Value:'';
    this.m022_list_name_placeholder = this.scenario_paramets_result[22].Parm_Value?this.scenario_paramets_result[22].Parm_Value:'';
    this.m022_num_days_placeholder = this.scenario_paramets_result[23].Parm_Value?this.scenario_paramets_result[23].Parm_Value:'';
    this.m023_amount_placeholder = this.scenario_paramets_result[24].Parm_Value?this.scenario_paramets_result[24].Parm_Value:'';
    this.m023_num_days_placeholder = this.scenario_paramets_result[25].Parm_Value?this.scenario_paramets_result[25].Parm_Value:'';
  }

  setDataDesc(){
    this.m001_is_parties_related_desc = this.scenario_paramets_result[0].Parm_Desc?this.scenario_paramets_result[0].Parm_Desc:'';
    this.m001_account_type_desc = this.scenario_paramets_result[1].Parm_Desc?this.scenario_paramets_result[1].Parm_Desc:'';
    this.m001_percentage_desc = this.scenario_paramets_result[2].Parm_Desc?this.scenario_paramets_result[2].Parm_Desc:'';
    this.m001_event_name_desc = this.scenario_paramets_result[3].Parm_Desc?this.scenario_paramets_result[3].Parm_Desc:'';
    this.m001_transaction_event_ind_desc = this.scenario_paramets_result[4].Parm_Desc?this.scenario_paramets_result[4].Parm_Desc:'';
    this.m002_account_type_desc = this.scenario_paramets_result[5].Parm_Desc?this.scenario_paramets_result[5].Parm_Desc:'';
    this.mm002_amount_desc = this.scenario_paramets_result[6].Parm_Desc?this.scenario_paramets_result[6].Parm_Desc:'';
    this.m002_num_inst_desc = this.scenario_paramets_result[7].Parm_Desc?this.scenario_paramets_result[7].Parm_Desc:'';
    this.m002_cdi_code_desc = this.scenario_paramets_result[8].Parm_Desc?this.scenario_paramets_result[8].Parm_Desc:'';
    this.m002_num_days_desc = this.scenario_paramets_result[9].Parm_Desc?this.scenario_paramets_result[9].Parm_Desc:'';
    this.m003_account_type_desc = this.scenario_paramets_result[10].Parm_Desc?this.scenario_paramets_result[10].Parm_Desc:'';
    this.m003_percentage_desc = this.scenario_paramets_result[11].Parm_Desc?this.scenario_paramets_result[11].Parm_Desc:'';
    this.m003_cdi_code_desc = this.scenario_paramets_result[12].Parm_Desc?this.scenario_paramets_result[12].Parm_Desc:'';
    this.m005_account_type_desc = this.scenario_paramets_result[13].Parm_Desc?this.scenario_paramets_result[13].Parm_Desc:'';
    this.m005_percentage_desc = this.scenario_paramets_result[14].Parm_Desc?this.scenario_paramets_result[14].Parm_Desc:'';
    this.m005_num_days_desc = this.scenario_paramets_result[15].Parm_Desc?this.scenario_paramets_result[15].Parm_Desc:'';
    this.m005_transaction_type_desc = this.scenario_paramets_result[16].Parm_Desc?this.scenario_paramets_result[16].Parm_Desc:'';
    this.m005_credit_ind_desc = this.scenario_paramets_result[17].Parm_Desc?this.scenario_paramets_result[17].Parm_Desc:'';
    this.m006_account_type_desc = this.scenario_paramets_result[18].Parm_Desc?this.scenario_paramets_result[18].Parm_Desc:'';
    this.m006_amount_desc = this.scenario_paramets_result[19].Parm_Desc?this.scenario_paramets_result[19].Parm_Desc:'';
    this.m006_num_days_desc = this.scenario_paramets_result[20].Parm_Desc?this.scenario_paramets_result[20].Parm_Desc:'';
    this.m006_transaction_type_desc = this.scenario_paramets_result[21].Parm_Desc?this.scenario_paramets_result[21].Parm_Desc:'';
    this.m006_credit_ind_desc = this.scenario_paramets_result[22].Parm_Desc?this.scenario_paramets_result[22].Parm_Desc:'';
    this.m007_account_type_desc = this.scenario_paramets_result[23].Parm_Desc?this.scenario_paramets_result[23].Parm_Desc:'';
    this.m007_amt_single_loan_desc = this.scenario_paramets_result[24].Parm_Desc?this.scenario_paramets_result[24].Parm_Desc:'';
    this.m007_num_days_desc = this.scenario_paramets_result[25].Parm_Desc?this.scenario_paramets_result[25].Parm_Desc:'';
    this.m007_total_amount_desc = this.scenario_paramets_result[26].Parm_Desc?this.scenario_paramets_result[26].Parm_Desc:'';
    this.m007_percentage_desc = this.scenario_paramets_result[27].Parm_Desc?this.scenario_paramets_result[27].Parm_Desc:'';
    this.m010_account_type_desc = this.scenario_paramets_result[28].Parm_Desc?this.scenario_paramets_result[28].Parm_Desc:'';
    this.m010_events_list_desc = this.scenario_paramets_result[29].Parm_Desc?this.scenario_paramets_result[29].Parm_Desc:'';
    this.m010_amount_desc = this.scenario_paramets_result[30].Parm_Desc?this.scenario_paramets_result[30].Parm_Desc:'';
    this.m010_cdi_code_desc = this.scenario_paramets_result[31].Parm_Desc?this.scenario_paramets_result[31].Parm_Desc:'';
    this.m010_num_days_desc = this.scenario_paramets_result[32].Parm_Desc?this.scenario_paramets_result[23].Parm_Desc:'';
    this.m010_num_events_desc = this.scenario_paramets_result[33].Parm_Desc?this.scenario_paramets_result[33].Parm_Desc:'';
    this.m016_account_type_desc = this.scenario_paramets_result[34].Parm_Desc?this.scenario_paramets_result[34].Parm_Desc:'';
    this.m016_num_days_desc = this.scenario_paramets_result[35].Parm_Desc?this.scenario_paramets_result[35].Parm_Desc:'';
    this.m020_number_desc = this.scenario_paramets_result[36].Parm_Desc?this.scenario_paramets_result[36].Parm_Desc:'';
    this.m020_auth_today_desc;
    this.m021_number_desc;
    this.m021_auth_today_desc;
    this.m022_amount_desc;
    this.m022_list_name_desc;
    this.m022_cdi_code_desc;
    this.m022_num_days_desc;
    this.m023_amount_desc;
    this.m023_pep_ind_desc;
    this.m023_num_days_desc;
  }

}
