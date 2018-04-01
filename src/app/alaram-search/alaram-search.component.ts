import { Component, OnInit } from '@angular/core';
import { Http , Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-alaram-search',
  templateUrl: './alaram-search.component.html',
  styleUrls: ['./alaram-search.component.css']
})
export class AlaramSearchComponent implements OnInit {
  AlarmId:string='';
  AlarmStatus:string='';
  MoneyLaunderingRisk:string='';
  CreateDate:string='';
  RunDate:string='';
  ScenarioName:string='';
  ScenarioId:string='';
  result:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  onClickSubmit(data) {
   


 

    let url="http://localhost:8081/aml/api/alaram/allalarams?AlarmId="+this.AlarmId+"&AlarmStatus="+this.AlarmStatus+
    "&MoneyLaunderingRisk="+this.MoneyLaunderingRisk+"&CreateDate="+this.CreateDate
    
    +"&RunDate="+this.RunDate+"&ScenarioName="+this.ScenarioName+
    "&ScenarioId="+this.ScenarioId                                                        
    ;
    
    this.http.get(url).subscribe(data => {
  this.result=data;

    });
    
  
 }
}
