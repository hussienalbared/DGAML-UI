import { Component, OnInit } from '@angular/core';
import { Http , Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-party-search',
  templateUrl: './party-search.component.html',
  styleUrls: ['./party-search.component.css']
})
export class PartySearchComponent implements OnInit {
  PartyNumber:string='';
  PartyId:string='';
  PartyName:string='';
  PoliticallyExposedPerson:string='';
  Risk:string='';
  PartyStatusDescription:string='';
  result:any;
  riskValue={1:'low',2:'medium',3:'high'};
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  onClickSubmit(data){
let url="http://localhost:8081/aml/api/party/search?PartyNumber="+this.PartyNumber+"&PartyId="+this.PartyId+
"&PartyName="+this.PartyName+
"&PoliticallyExposedPerson="+this.PoliticallyExposedPerson+
"&Risk="+this.Risk+"&PartyStatusDescription="+this.PartyStatusDescription;
this.http.get(url).subscribe(data => {
  this.result=data;

    });
  }

}
