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

  m001_account_type_placeholder;
  m001_is_parties_related_placeholder;
  m001_percentage_placeholder;
  m001_event_name_placeholder;
  m001_transaction_event_ind_placeholder;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private http:HttpClient,private translate:TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

}
