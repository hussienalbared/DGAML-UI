import { Component, OnInit } from '@angular/core';
import { Http , Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-external-party-search',
  templateUrl: './external-party-search.component.html',
  styleUrls: ['./external-party-search.component.css']
})
export class ExternalPartySearchComponent implements OnInit {
result:any;
ExtPartynumber:string="";
ExtPartyId:string="";
ExtPartyFullName:string="";
ExtPartyIdCountryCode:string="";
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  onClickSubmit(data){
    let url="http://localhost:8081/aml/api/externalParty/all?ExtPartynumber="+this.ExtPartynumber+
    "&ExtPartyId="+this.ExtPartyId+"&ExtPartyFullName="+this.ExtPartyFullName+
    "&ExtPartyIdCountryCode="+this.ExtPartyIdCountryCode;
    this.http.get(url).subscribe(data => {
      this.result=data;
    
        });
      }

}
