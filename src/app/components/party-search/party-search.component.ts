import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource ,MatSort} from '@angular/material';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-party-search',
  templateUrl: './party-search.component.html',
  styleUrls: ['./party-search.component.css']
})
export class PartySearchComponent {
  PartyNumber: string = '';
  PartyId: string = '';
  PartyName: string = '';
  PoliticallyExposedPerson: string = '';
  Risk: string = '';
  PartyStatusDescription: string = '';
  result: Party[];
  dataSource:any=null;
  riskValue = { 1: 'low', 2: 'medium', 3: 'high' };
  displayedColumns = ['pno', 'pid', 'pfnm', 'ppepind', 'riskClassification', 'pstatds'];
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;



  constructor(private http: HttpClient,private route:ActivatedRoute,private router:Router) { }

  ngAfterViewInit() {
   
  }
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onClickSubmit(data) {
 
    let url = "http://localhost:8081/aml/api/party/search?PartyNumber=" + this.PartyNumber + "&PartyId=" + this.PartyId +
      "&PartyName=" + this.PartyName +
      "&PoliticallyExposedPerson=" + this.PoliticallyExposedPerson +
      "&Risk=" + this.Risk + "&PartyStatusDescription=" + this.PartyStatusDescription;
    this.http.get<Party[]>(url).subscribe(data => {
      this.result = data;
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    });

   
  
  }
  getParty(partyNumber)
  {
  
    
    let url="http://localhost:8081/aml/api/v1/getSuspetedByObjectNumber?obj_number="+partyNumber;
    console.log(url)
    this.http.get<any[]>(url).subscribe(data=>{
if(data.length>0)
 this.router.navigate(["suspectDetail/"+data[0][0]+"/"+data[0][1]+"/"+partyNumber]);
    })

  }

}
export interface Party {
  pno: string;
  pid: string;
  pfnm: string;
  ppepind: string;
  riskClassification: string;
  pstatds: string;


}
