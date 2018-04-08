import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource ,MatSort} from '@angular/material';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"
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



  constructor(private http: HttpClient) { }

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

    console.log(this.result);
  
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
